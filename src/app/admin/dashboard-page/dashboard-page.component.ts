import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../../shared/posts.service';
import { Post } from '../../shared/interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  postsSubscription: Subscription;
  deleteSubscription: Subscription;
  searchStr = '';

  constructor(private postService: PostsService) {}

  ngOnInit() {
    this.postsSubscription = this.postService
      .getAll()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  ngOnDestroy() {
    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }

    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  remove(id: string) {
    this.deleteSubscription = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }
}
