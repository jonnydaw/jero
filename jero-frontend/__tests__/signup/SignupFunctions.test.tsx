import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { isValidEmail, isFieldMatch } from '@/app/components/Signup/SignupErrors'

// Email Test Start

test('Valid Email Test: Expect False (no @)', () => {
    const res = isValidEmail("testemail.com")
    expect(res).toBe(false);
})

test('Valid Email Test: Expect False (no domain)', () => {
    const res = isValidEmail("testemail@email")
    expect(res).toBe(false);
})

test('Valid Email: Expect False (contains space)', () => {
    const res = isValidEmail("teste mail@email")
    expect(res).toBe(false);
})

test('Valid Email: Expect True (Valid email)', () => {
    const res = isValidEmail("testEmail@email.com")
    expect(res).toBe(true);
})

test('Valid Email: Expect True (Can contain accent)', () => {
    const res = isValidEmail("testémail@email.com")
    expect(res).toBe(true);
})

test('Emails do not match: Expect False', () => {
    const res = isFieldMatch("email1@email.com","email2@gmail.com");
    expect(res).toBe(false);
})

test('Emails match: Expect True', () => {
    const res = isFieldMatch("email1@email.com","email1@email.com");
    expect(res).toBe(true);
})


// Email Test End


