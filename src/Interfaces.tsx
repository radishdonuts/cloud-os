export interface Note {
    id: string;
    title: string;
    content: string;
    modified: string;
    fontSize: number;
    fontFamily: string
}

export const defaultNote:Note = {
    id: '1',
    title: 'default',
    content: 'default-content',
    modified: 'Today',
    fontSize: 16,
    fontFamily: 'sans'
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  password: string;
  profilePhoto?: string; // Optional profile photo path
  wallpaper: {
    gradient: string;
    accent?: string;
    image?: string; // Optional wallpaper image
  };
  desktopApps: Array<{
    name: string;
    type: 'folder' | 'file' | 'app';
    icon?: string;
    image?: string; // PNG image path
  }>;
  notes: Array<Note>;
  photos: string[];
}

export const defaultUser:User = {
    id: '1',
    name: 'John Doe',
    avatar: 'JD',
    password:'password',
    profilePhoto: '/icons/tiger1.png', // Add your photo here
    wallpaper: {
    gradient: 'from-blue-500 via-blue-400 to-cyan-400',
    accent: 'blue',
    image: '/icons/DesktopWallpaper5.png'
    },
    desktopApps: [
    { name: 'Documents', type: 'folder', icon: 'folder', image: '/icons/Folder2.png' },
    { name: 'Projects', type: 'folder', icon: 'folder', image: '/icons/Folder2.png' },
    { name: 'Photos', type: 'app', icon: 'image', image: '/icons/Frame.png' },
    { name: 'Work Notes', type: 'file', icon: 'note', image: '/icons/Note.png' }
    ],
    notes: [
    { ...defaultNote,  id:'1', title: 'Work Notes', content: 'Meeting with team at 3 PM\nReview project proposals\nUpdate documentation', modified:'Yesterday' },
    { ...defaultNote, id:'2', title: 'Todo List', content: '- Finish CloudOS project\n- Review pull requests\n- Update README' }
    ],
    photos: ['Vacation 2024', 'Work Events', 'Family']
}

export function parseUser(user:User):string {

    for (const note in user.notes) {
        note
    }

    return ""
}
