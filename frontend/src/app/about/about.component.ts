import {Component} from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent {
  image_sources: { text: string, url: string }[] = [
    {
      text: 'Home: House Image 1',
      url: 'https://pixabay.com/photos/valley-house-cabin-mountain-6530966/'
    },
    {
      text: 'Home: House Image 2',
      url: 'https://pixabay.com/photos/mountains-alps-houses-cottages-6262535/'
    },
    {
      text: 'Home: Kitchen',
      url: 'https://pixabay.com/photos/rustic-kitchen-logs-log-home-2041017/'
    },
    {
      text: 'Home: Fireplace',
      url: 'https://pixabay.com/photos/fireplace-life-artist-wood-room-4856187/'
    },
    {
      text: 'Rooms: Room 1',
      url: 'https://pixabay.com/photos/master-bedroom-bed-logs-cabin-96086/'
    },
    {
      text: 'Rooms: Room 2',
      url: 'https://pixabay.com/photos/cabin-bedroom-sleep-sleeping-rest-413770/'
    },
    {
      text: 'Rooms: Room 3',
      url: 'https://pixabay.com/photos/log-home-log-home-bedroom-rustic-2225414/'
    }
  ]
}
