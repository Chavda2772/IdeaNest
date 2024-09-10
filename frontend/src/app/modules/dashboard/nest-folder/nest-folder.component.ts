import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-nest-folder',
  standalone: true,
  imports: [],
  templateUrl: './nest-folder.component.html',
  styleUrl: './nest-folder.component.css'
})
export class NestFolderComponent {
  @Input() CollectionId: Number = 0;
  @Input() CollectionName: String = '';
}
