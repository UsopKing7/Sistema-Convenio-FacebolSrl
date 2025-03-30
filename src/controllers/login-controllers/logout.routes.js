#!/usr/bin/env node

import { Router } from 'express';

export const logoutRouter = Router();

logoutRouter.post('/logout', (req, res) => {
  res.clearCookie('access_token', {
    httpOnly: true,
    sameSite: 'strict',
    secure: process.env.NODE_ENV === 'production',
  })
  res.redirect('/')
})