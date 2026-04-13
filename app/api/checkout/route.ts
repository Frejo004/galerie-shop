import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import type { CartItem } from '@/lib/types'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL ?? ''

function safeRedirectUrl(url: string | undefined, fallback: string): string {
  if (!url || !BASE_URL) return fallback
  try {
    const parsed = new URL(url)
    const base = new URL(BASE_URL)
    return parsed.origin === base.origin ? url : fallback
  } catch {
    return fallback
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { items, successUrl, cancelUrl } = body

    if (!Array.isArray(items) || items.length === 0) {
      return NextResponse.json({ error: 'No items in cart' }, { status: 400 })
    }

    const invalidItem = items.find(
      (item: CartItem) =>
        !item.title ||
        typeof item.price !== 'number' ||
        item.price <= 0 ||
        typeof item.quantity !== 'number' ||
        item.quantity < 1
    )
    if (invalidItem) {
      return NextResponse.json({ error: 'Invalid item data' }, { status: 400 })
    }

    const safeSuccessUrl = safeRedirectUrl(
      successUrl,
      `${BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`
    )
    const safeCancelUrl = safeRedirectUrl(cancelUrl, `${BASE_URL}/galerie`)

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: items.map((item: CartItem) => ({
        price_data: {
          currency: item.currency?.toLowerCase() || 'eur',
          product_data: {
            name: item.title,
            images: item.image ? [item.image] : [],
            description: item.support || '',
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      mode: 'payment',
      success_url: safeSuccessUrl,
      cancel_url: safeCancelUrl,
      metadata: {
        itemIds: items.map((i: CartItem) => i.id).join(','),
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal server error'
    console.error('Stripe error:', err)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
