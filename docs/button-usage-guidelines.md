# Button Usage Guidelines

## Overview

This guide explains when and how to use the standardized button variants in our application. We follow Chakra UI v2 conventions and use semantic tokens for consistent theming across light and dark modes.

---

## Standard Button Variants

### 1. Primary (`variant='primary'`)

**When to use:**
- Main call-to-action (CTA) buttons
- Form submission buttons
- Primary actions on a page or modal

**Visual style:**
- Solid background (black in light mode, white in dark mode)
- High contrast with white/black text
- Bold font weight

**Examples:**
```tsx
// Form submit button
<Button variant='primary' type='submit' isLoading={isSubmitting}>
  Sign In
</Button>

// Create new item
<Button variant='primary' onClick={handleCreate}>
  Create Process
</Button>

// Confirm action in modal
<Button variant='primary' onClick={handleConfirm}>
  Confirm
</Button>
```

**Rule:** Only use ONE primary button per page section or modal to maintain clear visual hierarchy.

---

### 2. Secondary (`variant='secondary'`)

**When to use:**
- Secondary actions
- Cancel buttons
- Alternative CTAs
- Filters and toggles

**Visual style:**
- Transparent background with border
- Medium contrast
- Semibold font weight

**Examples:**
```tsx
// Cancel button in modal
<Button variant='secondary' onClick={onClose}>
  Cancel
</Button>

// Alternative action
<Button variant='secondary' as={Link} to='/dashboard'>
  Go Back
</Button>

// Filter button
<Button variant='secondary' onClick={handleFilter}>
  Apply Filters
</Button>
```

**Common pattern with primary:**
```tsx
<Flex justifyContent='flex-end' gap={2}>
  <Button variant='secondary' onClick={onClose}>
    Cancel
  </Button>
  <Button variant='primary' type='submit' isLoading={isPending}>
    Confirm
  </Button>
</Flex>
```

---

### 3. Danger (`variant='danger'`)

**When to use:**
- Destructive actions (delete, remove, permanently alter)
- Actions that cannot be easily undone
- Critical operations requiring user attention

**Visual style:**
- Solid red background
- White text
- Bold font weight

**Examples:**
```tsx
// Delete user
<Button variant='danger' onClick={handleDelete}>
  Delete Account
</Button>

// Remove member
<Button variant='danger' onClick={handleRemove} isLoading={isRemoving}>
  Remove Member
</Button>

// Permanently delete
<Button variant='danger' onClick={handlePermanentDelete}>
  Permanently Delete
</Button>
```

**Confirmation pattern:**
```tsx
<Modal>
  <ModalBody>
    Are you sure you want to delete this? This action cannot be undone.
  </ModalBody>
  <ModalFooter>
    <Button variant='secondary' onClick={onClose}>
      Cancel
    </Button>
    <Button variant='danger' onClick={handleDelete}>
      Delete
    </Button>
  </ModalFooter>
</Modal>
```

---

### 4. Ghost (`variant='ghost'` - Chakra default)

**When to use:**
- Tertiary actions
- Close/dismiss buttons
- Optional actions
- Icon buttons in toolbars

**Visual style:**
- Transparent background
- No border
- Only shows background on hover

**Examples:**
```tsx
// Close button
<Button variant='ghost' onClick={onClose}>
  Close
</Button>

// Icon button
<IconButton
  variant='ghost'
  icon={<LuX />}
  aria-label='Close'
  onClick={onClose}
/>

// Tertiary action
<Button variant='ghost' onClick={handleSkip}>
  Skip for now
</Button>
```

---

### 5. Link (`variant='link'` - Chakra default)

**When to use:**
- Text-style navigation
- Inline actions that look like links
- Logout/sign out buttons

**Visual style:**
- No background or border
- Underlined on hover
- Looks like a text link

**Examples:**
```tsx
// Navigation link
<Button variant='link' as={RouterLink} to='/help'>
  Learn more
</Button>

// Logout
<Button variant='link' onClick={handleLogout}>
  Sign Out
</Button>
```

---

## Common Patterns

### Modal Footer (Confirmation)
```tsx
<ModalFooter>
  <Flex justifyContent='flex-end' gap={2}>
    <Button variant='secondary' onClick={onClose}>
      Cancel
    </Button>
    <Button variant='primary' onClick={handleAction} isLoading={isPending}>
      Confirm
    </Button>
  </Flex>
</ModalFooter>
```

### Form Submission
```tsx
<form onSubmit={handleSubmit}>
  {/* Form fields */}

  <Button variant='primary' type='submit' w='full' isLoading={isSubmitting}>
    Submit
  </Button>
</form>
```

### Destructive Confirmation
```tsx
<ModalFooter>
  <Flex justifyContent='flex-end' gap={2}>
    <Button variant='secondary' onClick={onClose}>
      Cancel
    </Button>
    <Button variant='danger' onClick={handleDelete} isLoading={isDeleting}>
      Delete
    </Button>
  </Flex>
</ModalFooter>
```

### Page Actions
```tsx
<Flex justifyContent='space-between' align='center'>
  <Button variant='secondary' as={Link} to='/dashboard'>
    Back
  </Button>
  <Button variant='primary' onClick={handleSave}>
    Save Changes
  </Button>
</Flex>
```

---

## Size Guidelines

Use Chakra's standard size prop:

- `size='xs'` - Compact UIs, table actions, badges
- `size='sm'` - **Default** - Most buttons in the application
- `size='md'` - Emphasized actions, dashboard CTAs
- `size='lg'` - Hero sections, landing page CTAs

**Examples:**
```tsx
// Default (small)
<Button variant='primary'>Submit</Button>

// Medium for emphasis
<Button variant='primary' size='md'>Create New Vote</Button>

// Large for hero CTA
<Button variant='primary' size='lg'>Get Started</Button>
```

---

## Loading States

Always use the `isLoading` prop for async actions:

```tsx
<Button
  variant='primary'
  type='submit'
  isLoading={isSubmitting}
>
  Sign In
</Button>
```

**Note:** The `shouldWrapChildren` prop is no longer needed with the new variants - Chakra handles this automatically.

---

## Disabled States

Use the `isDisabled` prop:

```tsx
<Button
  variant='primary'
  isDisabled={!isValid}
>
  Submit
</Button>
```

All variants automatically handle disabled styling with reduced opacity.

---

## Icon Buttons

Use `IconButton` component with variants:

```tsx
// Ghost icon button (most common)
<IconButton
  variant='ghost'
  icon={<LuX />}
  aria-label='Close'
  size='sm'
/>

// Primary icon button
<IconButton
  variant='primary'
  icon={<LuPlus />}
  aria-label='Add item'
/>

// Danger icon button
<IconButton
  variant='danger'
  icon={<LuTrash2 />}
  aria-label='Delete'
/>
```

**Always include `aria-label` for accessibility!**

---

## Advanced: When to Use ColorScheme

For most cases, use the semantic variants above. However, you can combine variants with `colorScheme` for special cases:

```tsx
// Red outline button (less severe than solid danger)
<Button variant='outline' colorScheme='red' onClick={handleRemove}>
  Remove from Group
</Button>

// Gray solid button (neutral action)
<Button variant='solid' colorScheme='gray' onClick={handleNeutralAction}>
  Schedule
</Button>
```

**Avoid** using `colorScheme='black'` - use `variant='primary'` instead.

---

## Custom Variants (Internal Use)

These are for specific UI patterns - don't use in general components:

- `variant='listmenu'` - Dashboard menu items only
- `variant='profilemenu'` - User profile dropdown only
- `variant='navbar'` - Navigation bar links only
- `variant='unstyled'` - Special cases only

---

## Migration Guide

### Before (Old Pattern)
```tsx
// ❌ Old - using colorScheme
<Button colorScheme='black' type='submit' isLoading={isSubmitting} shouldWrapChildren>
  Sign In
</Button>

// ❌ Old - generic outline
<Button variant='outline' onClick={onClose}>
  Cancel
</Button>

// ❌ Old - red colorScheme
<Button colorScheme='red' onClick={handleDelete}>
  Delete
</Button>
```

### After (New Pattern)
```tsx
// ✅ New - semantic variant
<Button variant='primary' type='submit' isLoading={isSubmitting}>
  Sign In
</Button>

// ✅ New - semantic secondary
<Button variant='secondary' onClick={onClose}>
  Cancel
</Button>

// ✅ New - semantic danger
<Button variant='danger' onClick={handleDelete}>
  Delete
</Button>
```

---

## Dark Mode

All button variants automatically support dark mode through semantic tokens. No additional code needed!

**Light mode:**
- Primary: Black background, white text
- Secondary: Gray border, black text
- Danger: Red background, white text

**Dark mode:**
- Primary: White background, black text
- Secondary: Gray border, white text
- Danger: Red background, white text

---

## Accessibility

All button variants meet WCAG AA contrast standards in both light and dark modes.

**Best practices:**
1. Always provide clear button labels
2. Use `aria-label` for icon-only buttons
3. Ensure sufficient spacing between buttons (use `gap={2}` or more)
4. Don't rely solely on color to convey meaning
5. Test keyboard navigation (Tab, Enter, Space)

---

## Questions?

If you're unsure which variant to use:

1. **Is it the main action?** → `variant='primary'`
2. **Is it a cancel/back action?** → `variant='secondary'`
3. **Is it destructive/dangerous?** → `variant='danger'`
4. **Is it tertiary/optional?** → `variant='ghost'`
5. **Is it a text link?** → `variant='link'`

When in doubt, ask the team or refer to existing patterns in similar components.
