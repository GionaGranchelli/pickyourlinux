# Task 081: Feedback-Driven Polish & Correction

## Status
- [x] Correct openSUSE metadata (Proprietary Support & NVIDIA)
- [x] Add Bazzite, CachyOS, and PikaOS to dataset
- [x] Soften exclusion reasons in Italian and English
- [x] Eliminate logic loops in question flow (showIf refinement)
- [x] Add descriptive tooltips/descriptions for Desktop Environments
- [x] Make results filters collapsible on mobile
- [x] Fix "Close" translation in Italian (Vicino -> Chiudi)
- [x] Add "Back" button and specific reasons to Disqualified Screen
- [x] Implement SEO metadata in nuxt.config.ts

## Context
User feedback highlighted confusing redundancy in questions, inaccurate openSUSE data, and a broken mobile filter UI. Experts felt "trapped" by disqualifiers without a way back, and beginners felt lost with technical terms like GNOME/KDE.

## Results
- **Data**: openSUSE is now more accurately represented. Popular gaming distros are available.
- **Logic**: Questions now "remember" earlier choices and skip redundant prompts.
- **UX**: Filters no longer cover the mobile screen. Disqualified users can now "go back" instead of restarting.
- **SEO**: Metadata added for better social sharing and search visibility.
