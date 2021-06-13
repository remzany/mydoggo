import { TestBed } from '@angular/core/testing';

import { PhotoGalleryService } from './photo-gallery.service';

describe('PhotoGalleryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PhotoGalleryService = TestBed.get(PhotoGalleryService);
    expect(service).toBeTruthy();
  });
});
