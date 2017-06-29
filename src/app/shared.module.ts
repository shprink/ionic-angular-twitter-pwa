import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from 'ionic-angular';
import { AvatarComponent } from '../components/avatar/avatar';
import { TweetFabComponent } from '../components/tweet-fab/tweet-fab';
import { MessageFabComponent } from '../components/message-fab/message-fab';
import { AvatarToolbarComponent } from '../components/avatar-toolbar/avatar-toolbar';
import { ProfileHeaderComponent } from '../components/profile-header/profile-header';
import { FeedComponent } from '../components/feed/feed';
import { TweetComponent } from '../components/tweet/tweet';
import { OgComponent } from '../components/og/og';
import { MediaComponent } from '../components/media/media';
import { SpinnerComponent } from '../components/spinner/spinner';
import { TrendingHashtagsComponent } from '../components/trendingHashtags/trendingHashtags';
import { TweetTextComponent } from '../components/tweet-text/tweet-text';

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    AvatarComponent,
    AvatarToolbarComponent,
    TweetFabComponent,
    MessageFabComponent,
    ProfileHeaderComponent,
    FeedComponent,
    TweetComponent,
    OgComponent,
    MediaComponent,
    SpinnerComponent,
    TrendingHashtagsComponent,
    TweetTextComponent,
  ],
  exports: [
    AvatarComponent,
    AvatarToolbarComponent,
    TweetFabComponent,
    MessageFabComponent,
    ProfileHeaderComponent,
    FeedComponent,
    TweetComponent,
    OgComponent,
    MediaComponent,
    SpinnerComponent,
    TrendingHashtagsComponent,
    TweetTextComponent,
  ],
})
export class SharedLazyModule {}
