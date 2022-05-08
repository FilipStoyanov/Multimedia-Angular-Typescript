"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddCollectionComponent = void 0;
var core_1 = require("@angular/core");
var AddCollectionComponent = /** @class */ (function () {
    function AddCollectionComponent(modalService, collectionService) {
        this.modalService = modalService;
        this.collectionService = collectionService;
        this.collection = { user: '', name: '', movies: [], _id: '' };
    }
    AddCollectionComponent.prototype.ngOnInit = function () {
    };
    AddCollectionComponent.prototype.openModal = function (content) {
        this.modalService.open(content, { backdropClass: 'light-blue-backdrop' });
    };
    AddCollectionComponent.prototype.onChangeName = function (event) {
        this.nameInput = event.target.value;
    };
    AddCollectionComponent.prototype.createCollection = function () {
        this.collection.name = this.nameInput;
        this.collection.user = JSON.parse(localStorage.getItem('user'))._id;
        this.collectionService.addCollection(this.collection).subscribe();
        window.location.reload();
    };
    AddCollectionComponent = __decorate([
        core_1.Component({
            selector: 'app-add-collection',
            templateUrl: './add-collection.component.html',
            styleUrls: ['./add-collection.component.scss']
        })
    ], AddCollectionComponent);
    return AddCollectionComponent;
}());
exports.AddCollectionComponent = AddCollectionComponent;
