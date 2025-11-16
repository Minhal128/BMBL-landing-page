# BMBLANCE Testing Guide

## Quick Start

### 1. Install & Run
```bash
npm install
npm run dev
```

The app will run at `http://localhost:5173`

---

## Testing Wallet Connection

### Desktop Testing
1. **With MetaMask**
   - Install MetaMask extension
   - Click "Connect Wallet" button
   - Should show wallet selection modal
   - Select MetaMask
   - Approve connection in MetaMask
   - Should display connected address

2. **With Other Wallets**
   - Install Coinbase Wallet, Rainbow, or Trust Wallet extension
   - Click "Connect Wallet"
   - Select desired wallet
   - Complete connection flow

### Mobile Testing
1. **iOS/Android with Mobile Wallet**
   - Open in mobile browser (Safari/Chrome)
   - Click "Connect Wallet"
   - Web3Modal should show available wallets
   - Select Trust Wallet, MetaMask Mobile, etc.
   - Approve connection in wallet app
   - Should redirect back and show address

---

## Testing Navigation

### Hero Section
- [ ] "Join the Hive (Presale)" button → Scrolls to Presale section
- [ ] "Learn More" button → Scrolls to About section

### Community Section
- [ ] "Join Telegram" → Opens Telegram (https://t.me/bmblance)
- [ ] "Follow on Twitter" → Opens Twitter (https://twitter.com/bmblance)
- [ ] Social cards → Each opens respective platform
- [ ] "Join Now" buttons → Open social links

### Header Navigation
- [ ] All menu items scroll to correct sections
- [ ] Mobile menu works on small screens
- [ ] Menu closes after navigation

### Footer Links
- [ ] Quick Links navigate correctly
- [ ] Social links open in new tabs
- [ ] Contract address is copyable

---

## Testing Content

### About Section
- [ ] "Why Bees Matter" section visible
- [ ] Crisis statistics display correctly
- [ ] Solution section explains BMBLANCE impact
- [ ] All animations play smoothly

### Presale Section
- [ ] Displays token information
- [ ] Connect Wallet button works
- [ ] Shows balance after connection
- [ ] Transfer functionality available

---

## Testing Responsive Design

### Breakpoints to Test
- [ ] Mobile: 375px (iPhone SE)
- [ ] Tablet: 768px (iPad)
- [ ] Desktop: 1024px+
- [ ] Large Desktop: 1440px+

### Mobile Checklist
- [ ] Text is readable
- [ ] Buttons are touch-friendly
- [ ] Images scale properly
- [ ] No horizontal scrolling
- [ ] Navigation is accessible

---

## Testing Performance

### Browser Console
1. Open DevTools (F12)
2. Check Console tab for errors
3. Look for warnings about missing dependencies

### Network Tab
1. Check all assets load
2. Verify no 404 errors
3. Check load times

### Lighthouse
1. Run Lighthouse audit
2. Check Performance score
3. Check Accessibility score

---

## Testing Animations

- [ ] Floating bees move smoothly
- [ ] Buttons scale on hover
- [ ] Sections fade in on scroll
- [ ] Transitions are smooth
- [ ] No jank or stuttering

---

## Common Issues & Solutions

### Issue: "Web3Modal not initialized"
**Solution**: 
- Refresh the page
- Check `.env` has `VITE_WALLET_CONNECT_PROJECT_ID`
- Check browser console for errors

### Issue: Wallet connection fails
**Solution**:
- Ensure wallet extension is installed
- Try different wallet provider
- Check network is set to Sepolia
- Clear browser cache

### Issue: Buttons don't navigate
**Solution**:
- Check browser console for JavaScript errors
- Verify section IDs match in HTML
- Test smooth scroll is enabled

### Issue: Mobile wallet doesn't work
**Solution**:
- Ensure mobile wallet app is installed
- Try opening in wallet's built-in browser
- Check WalletConnect Project ID is valid

---

## Environment Setup

### Required Environment Variables
```
VITE_WALLET_CONNECT_PROJECT_ID=a8c9c34d63e003
```

### Optional
```
SEPOLIA_RPC_URL=https://eth-sepolia.g.alchemy.com/v2/demo
```

---

## Deployment Checklist

Before deploying to production:

- [ ] All tests pass
- [ ] No console errors
- [ ] Wallet connection works
- [ ] Navigation works
- [ ] Mobile responsive
- [ ] Social links correct
- [ ] Environment variables set
- [ ] Build succeeds: `npm run build`
- [ ] Preview works: `npm run preview`

---

## Support Resources

- **Web3Modal Docs**: https://docs.walletconnect.com/web3modal/
- **Ethers.js Docs**: https://docs.ethers.org/
- **Sepolia Faucet**: https://sepolia-faucet.pk910.de/
- **Sepolia Explorer**: https://sepolia.etherscan.io/
