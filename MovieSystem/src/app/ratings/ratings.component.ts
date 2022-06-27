import { Component, OnInit } from '@angular/core';
import { RankingService, Ranking } from '../services/ranking.service';
import { UserData } from '../registration/registration.component';
import { Movie } from '../services/movie.service';
import { Collection, CollectionMovie, CollectionService } from '../services/collection.service';

@Component({
  selector: 'app-ratings',
  templateUrl: './ratings.component.html',
  styleUrls: ['./ratings.component.scss']
})
export class RatingsComponent implements OnInit {
  public readonly movieUrl = '/movie/';
  public rankingCollections: Ranking[] = [];
  public user: UserData;
  public showApplyAlert: boolean;

  constructor(private rankingService: RankingService, private collectionService: CollectionService) {
    this.showApplyAlert = false;
    this.user = JSON.parse(localStorage.getItem('user'));
    this.rankingService.getAllRankingsByUserId(this.user._id).subscribe(
      data => {
        this.rankingCollections = (data as any).data;
        console.log((data as any).data);
        //
      },
      //
    );
   }

  ngOnInit(): void {
  }

  removeCollection(ranking: Ranking, event: Event): void{
     event.stopPropagation();
     const ind = this.rankingCollections.indexOf(ranking);
     this.rankingCollections.splice(ind, 1);
     this.rankingService.deleteRanking(ranking).subscribe({});
  }

  applyCollectionOrder(ranking: Ranking, event: Event): void {
    event.stopPropagation();
    let reorderedCollection: Collection;
    reorderedCollection = {user: ranking.receiver, name: ranking.collectionName, movies: ranking.movies[0], _id: ranking.collectionId };
    this.collectionService.reorderCollection(reorderedCollection).subscribe({});
    this.removeCollection(ranking, event);
  }
  applyChanges(ranking: Ranking, event: Event): void {
    event.stopPropagation();
    const arr = [];
    const sortedIndex = [];
    let len;
    const movies: Movie[] = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < ranking.movies.length; ++i){
      // tslint:disable-next-line:prefer-for-of
      len = ranking.movies[i].length;
      for (let j = 0; j < ranking.movies[i].length; ++j){
          if (sortedIndex[ranking.movies[i][j].id] === undefined){
            if (arr.length < ranking.movies[i].length){
              arr.push(ranking.movies[i][j].id);
            }
            if (movies.length < ranking.movies[i].length){
              movies.push(ranking.movies[i][j]);
            }
            sortedIndex[ranking.movies[i][j].id] = 0;
          }
          sortedIndex[ranking.movies[i][j].id] += j;
      }
    }
    let y = 1;
    for (const ind of arr){
      sortedIndex[ind] = Math.floor(sortedIndex[ind] / len) + y;
      --y;
    }
    this.showApplyAlert = true;
    setTimeout(() => {
    this.showApplyAlert = false;
    }, 3000);

    const sortMovies = new Array(len).fill(0);
    for (let i = 0; i < len; ++i){
      for (let j = i + 1; j < len; ++j){
         if (sortedIndex[arr[i]] > sortedIndex[arr[j]]){
            const swap = sortedIndex[arr[i]];
            sortedIndex[arr[i]] = sortedIndex[arr[j]];
            sortedIndex[arr[j]] = swap;
         }
      }
    }
    const a = [...sortedIndex];
    // this.removeCollection(ranking, event);
  }
}
