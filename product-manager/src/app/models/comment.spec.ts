import { ProductComment } from './comment';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';

describe('Comment', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ellenőrzi, hogy nincsenek függőben lévő API-hívások
  });

  it('should create an instance from API data', (done: DoneFn) => {
    const apiUrl = 'https://dummyjson.com/comments';

    httpClient.get<{comments: any[]}>(apiUrl).subscribe((response) => {
      const commentsData = response.comments;
      
      if (commentsData.length > 0) {
        const firstCommentData = commentsData[0];
        expect(new ProductComment(firstCommentData)).toBeTruthy();
        done(); // Jelezze a Jasmine-nak, hogy az aszinkron művelet befejeződött
      } else {
        done.fail('API did not return any comments data');
      }
    });

    const req = httpTestingController.expectOne(apiUrl);
    req.flush({ // Itt adhatod meg a tesztadatokat, amiket a tesztben szeretnél használni
      comments: [
        {
          id: 1,
          body: 'Sample comment body',
          postId: 1,
          user: {
            id: 1,
            username: 'Sample User',
          },
        },
      ],
      total: 1,
      skip: 0,
      limit: 1
    });
  });
});
