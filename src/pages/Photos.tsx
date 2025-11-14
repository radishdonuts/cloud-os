import React, { useState } from 'react';
import { Window } from '../components/layout/Window';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { ChevronLeftIcon, ChevronRightIcon, XIcon, TrashIcon } from 'lucide-react';
export interface PhotosProps {
  onClose: () => void;
  initialFolder?: string;
}
interface Photo {
  id: string;
  name: string;
  url: string;
  folder: string;
}
export function Photos({
  onClose,
  initialFolder = 'All Photos'
}: PhotosProps) {
  const [selectedFolder, setSelectedFolder] = useState(initialFolder);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [photos, setPhotos] = useState<Photo[]>([{
    id: '1',
    name: 'Beach_Sunset.jpg',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    folder: 'Vacation 2024'
  }, {
    id: '2',
    name: 'Mountain_View.jpg',
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    folder: 'Vacation 2024'
  }, {
    id: '3',
    name: 'City_Night.jpg',
    url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800',
    folder: 'Vacation 2024'
  }, {
    id: '4',
    name: 'Family_Portrait.jpg',
    url: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=800',
    folder: 'Family Photos'
  }, {
    id: '5',
    name: 'Birthday_Party.jpg',
    url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
    folder: 'Family Photos'
  }, {
    id: '6',
    name: 'Screenshot_1.png',
    url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800',
    folder: 'Screenshots'
  }, {
    id: '7',
    name: 'Wallpaper_1.jpg',
    url: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800',
    folder: 'Wallpapers'
  }, {
    id: '8',
    name: 'Wallpaper_2.jpg',
    url: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=800',
    folder: 'Wallpapers'
  }]);
  const folders = ['All Photos', 'Vacation 2024', 'Family Photos', 'Screenshots', 'Wallpapers'];
  const filteredPhotos = selectedFolder === 'All Photos' ? photos : photos.filter(p => p.folder === selectedFolder);
  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
  };
  const handleNext = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex + 1) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };
  const handlePrevious = () => {
    if (!selectedPhoto) return;
    const currentIndex = filteredPhotos.findIndex(p => p.id === selectedPhoto.id);
    const nextIndex = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setSelectedPhoto(filteredPhotos[nextIndex]);
  };
  const handleDelete = (photoId: string) => {
    setPhotos(photos.filter(p => p.id !== photoId));
    setSelectedPhoto(null);
  };
  return <div className="fixed inset-0 z-40 flex items-center justify-center p-6 bg-black/20 backdrop-blur-sm animate-fade-in">
      <Window title="Photos" onClose={onClose} width="w-full max-w-6xl" height="h-[85vh]">
        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 border-r border-cloud-gray/20 dark:border-dark-border p-4 space-y-2">
            {folders.map(folder => <button key={folder} onClick={() => setSelectedFolder(folder)} className={`
                  w-full text-left px-4 py-3 rounded-cloud-lg transition-all duration-200
                  ${selectedFolder === folder ? 'bg-cloud-green/20 text-cloud-green' : 'text-cloud-gray-dark dark:text-dark-text-muted hover:bg-cloud-gray/20 dark:hover:bg-dark-bg-lighter'}
                `}>
                {folder}
              </button>)}
          </div>

          {/* Photo Grid */}
          <div className="flex-1 overflow-auto p-6">
            <h2 className="text-2xl font-bold text-cloud-gray-deeper dark:text-dark-text mb-6">
              {selectedFolder}
            </h2>
            <div className="grid grid-cols-4 gap-4">
              {filteredPhotos.map(photo => <Card key={photo.id} hover className="p-2 cursor-pointer" onClick={() => handlePhotoClick(photo)}>
                  <div className="aspect-square rounded-cloud overflow-hidden bg-cloud-gray/20">
                    <img src={photo.url} alt={photo.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-sm font-medium text-cloud-gray-deeper dark:text-dark-text mt-2 truncate">
                    {photo.name}
                  </p>
                </Card>)}
            </div>
          </div>
        </div>
      </Window>

      {/* Photo Viewer Modal */}
      {selectedPhoto && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 animate-fade-in">
          <button onClick={() => setSelectedPhoto(null)} className="absolute top-20 right-20 p-3 bg-white/10 hover:bg-white/20 rounded-cloud-lg transition-colors z-10">
            <XIcon size={24} className="text-white" />
          </button>

          <button onClick={handlePrevious} className="absolute left-20 p-3 bg-white/10 hover:bg-white/20 rounded-cloud-lg transition-colors z-10">
            <ChevronLeftIcon size={32} className="text-white" />
          </button>

          <button onClick={handleNext} className="absolute right-20 p-3 bg-white/10 hover:bg-white/20 rounded-cloud-lg transition-colors z-10">
            <ChevronRightIcon size={32} className="text-white" />
          </button>

          <div className="max-w-5xl max-h-[80vh] flex flex-col items-center">
            <img src={selectedPhoto.url} alt={selectedPhoto.name} className="max-w-full max-h-[70vh] rounded-cloud-lg shadow-cloud-lg" />
            <div className="mt-6 flex items-center gap-4">
              <p className="text-white text-lg font-medium">
                {selectedPhoto.name}
              </p>
              <Button variant="danger" size="sm" onClick={() => handleDelete(selectedPhoto.id)}>
                <TrashIcon size={16} className="mr-2" />
                Delete
              </Button>
            </div>
          </div>
        </div>}
    </div>;
}