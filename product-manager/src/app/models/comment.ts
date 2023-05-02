export class ProductComment {
    id: number;
    body: string;
    postId: number;
    user: {
      id: number;
      username: string;
    };
  
    constructor(data: any) {
      this.id = data.id || 0;
      this.body = data.body || '';
      this.postId = data.postId || 0;
      this.user = data.user || { id: 0, username: '' };
    }
  }
  