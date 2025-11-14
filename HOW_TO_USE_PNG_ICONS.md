# How to Use PNG Images as Desktop Icons

## Setup

### 1. Create a Public Folder (if it doesn't exist)
Create a `public` folder in your project root:
```
cloud-os/
  └── public/
      └── icons/
          ├── folder.png
          ├── documents.png
          ├── photos.png
          └── notes.png
```

### 2. Add Your PNG Images
Place your PNG icon files in the `public/icons/` directory. Recommended size: **64x64px** or **128x128px** for best quality.

## Usage

### Method 1: Using Image URLs in User Data

In `src/App.tsx`, add the `image` property to any desktop app:

```typescript
{
  id: '1',
  name: 'John Doe',
  avatar: 'JD',
  wallpaper: {
    gradient: 'from-blue-500 via-blue-400 to-cyan-400',
    accent: 'blue'
  },
  desktopApps: [
    { 
      name: 'Documents', 
      type: 'folder', 
      icon: 'folder',
      image: '/icons/folder.png'  // ← Add this line
    },
    { 
      name: 'Projects', 
      type: 'folder', 
      icon: 'folder',
      image: '/icons/projects.png'  // ← Custom PNG icon
    },
    { 
      name: 'Photos', 
      type: 'app', 
      icon: 'image',
      image: '/icons/photos.png'  // ← Custom PNG icon
    },
  ],
  // ... rest of user data
}
```

### Method 2: Using External URLs

You can also use external image URLs:

```typescript
desktopApps: [
  { 
    name: 'Documents', 
    type: 'folder',
    image: 'https://example.com/icons/folder.png'
  },
]
```

### Method 3: Using Base64 Images

For small icons, you can embed them directly:

```typescript
desktopApps: [
  { 
    name: 'Documents', 
    type: 'folder',
    image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...'
  },
]
```

## Priority Order

The `AppIcon` component displays icons in this priority:
1. **PNG Image** (`image` prop) - Highest priority
2. **Emoji** (`emoji` prop)
3. **Lucide Icon** (`icon` prop)
4. **Default Folder Icon** - Fallback

## Example: Complete User with PNG Icons

```typescript
{
  id: '1',
  name: 'John Doe',
  avatar: 'JD',
  wallpaper: {
    gradient: 'from-blue-500 via-blue-400 to-cyan-400',
  },
  desktopApps: [
    { 
      name: 'Documents', 
      type: 'folder',
      image: '/icons/documents.png'
    },
    { 
      name: 'Projects', 
      type: 'folder',
      image: '/icons/projects.png'
    },
    { 
      name: 'Photos', 
      type: 'app',
      image: '/icons/camera.png'
    },
    { 
      name: 'Work Notes', 
      type: 'file',
      emoji: '📝'  // You can still use emojis
    }
  ],
  notes: [...],
  photos: [...]
}
```

## Tips

1. **Transparent PNGs work best** - They blend nicely with the desktop background
2. **Square images** - Use 1:1 aspect ratio (64x64, 128x128, 256x256)
3. **Optimize file size** - Use tools like TinyPNG to reduce file size
4. **Consistent style** - Use icons from the same icon pack for a cohesive look

## Recommended Icon Packs

- **macOS Big Sur Icons** - Clean, modern style
- **Fluent Design Icons** - Windows 11 style
- **Material Design Icons** - Google's icon set
- **Feather Icons** - Minimalist line icons
- **Iconoir** - Open-source icon library

## Testing

After adding images, test by:
1. Starting the dev server: `npm run dev`
2. Logging in as the user
3. Checking if the PNG icons appear on the desktop
4. Verifying the hover effects work correctly

## Troubleshooting

**Icons not showing?**
- Check the file path is correct
- Ensure the `public` folder is in the project root
- Verify the image file exists
- Check browser console for 404 errors

**Icons look blurry?**
- Use higher resolution images (128x128 or 256x256)
- Ensure the image is not being stretched

**Icons too large/small?**
- The component automatically sizes to 64x64px
- Use `object-cover` for proper scaling

