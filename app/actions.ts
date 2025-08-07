'use server'

import { z } from 'zod'

// Define a schema for email validation
const emailSchema = z.string().email({ message: "Invalid email address." }).min(1, { message: "Email is required." })

export async function joinNewsletter(prevState: any, formData: FormData) {
  const email = formData.get('email')

  const validatedEmail = emailSchema.safeParse(email)

  if (!validatedEmail.success) {
    return {
      success: false,
      message: validatedEmail.error.errors[0].message,
    }
  }

  // Simulate saving the email to a newsletter list (e.g., Mailchimp, Brevo, CRM)
  // In a real application, you would integrate with your email marketing service here.
  console.log(`Newsletter subscription: Saving email ${validatedEmail.data} to Mailchimp/Brevo...`)
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay

  // In a real application, you would trigger a confirmation email here.
  console.log(`Confirmation email sent to ${validatedEmail.data}.`)

  return {
    success: true,
    message: "Welcome to the movement! You’re now officially part of the Italea circle. Check your inbox for soulful updates, exclusive offers, and product drops.",
  }
}

export async function joinWishlist(prevState: any, formData: FormData) {
  const email = formData.get('email')

  const validatedEmail = emailSchema.safeParse(email)

  if (!validatedEmail.success) {
    return {
      success: false,
      message: validatedEmail.error.errors[0].message,
    }
  }

  // Simulate saving the email to a wishlist/early access list
  // In a real application, you would integrate with your CRM or custom backend here.
  console.log(`Wishlist subscription: Saving email ${validatedEmail.data} to early access list...`)
  await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate network delay

  // In a real application, you would trigger a confirmation email here.
  console.log(`Wishlist confirmation email sent to ${validatedEmail.data}.`)

  return {
    success: true,
    message: "You’re on the list! We’ll let you know when something special is about to drop.",
  }
}
