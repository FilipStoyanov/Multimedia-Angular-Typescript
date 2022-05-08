import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CollectionService } from 'src/app/services/collection.service';
import { Collection } from 'src/app/services/collection.service';

@Component({
  selector: 'app-add-collection',
  templateUrl: './add-collection.component.html',
  styleUrls: ['./add-collection.component.scss']
})
export class AddCollectionComponent implements OnInit {

  nameInput: string;
  collection: Collection;
  constructor(private modalService: NgbModal, private collectionService: CollectionService) {
    this.collection = {user: '', name: '', movies: [], _id: ''};
  }

  ngOnInit(): void {
  }
  openModal(content): void {
      this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }
  onChangeName(event: any): void {
    this.nameInput = event.target.value;
  }
  createCollection(): void {
    this.collection.name = this.nameInput;
    this.collection.user = JSON.parse(localStorage.getItem('user'))._id;
    this.collectionService.addCollection(this.collection).subscribe();
    window.location.reload();
  }

}
