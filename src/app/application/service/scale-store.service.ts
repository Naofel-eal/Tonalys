import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { Scale, Note, Mode } from "src/app/domain";
import { IScaleRepository, SCALE_REPOSITORY } from "../repository/scale.repository";

@Injectable({ providedIn: 'root' })
export class ScaleStoreService {
  private readonly _scales$ = new BehaviorSubject<Scale[]>([]);
  public readonly scales$ = this._scales$.asObservable();
  private initialized = false;

  constructor(@Inject(SCALE_REPOSITORY) private readonly repository: IScaleRepository) {}

  public init(): void {
    if (this.initialized) return;
    this.initialized = true;

    this.repository.getAll().subscribe(scales => {
      if (scales.length) {
        this._scales$.next(scales);
      } else {
        this.generateAll().subscribe();
      }
    });
  }

  public generateAll(): Observable<Scale[]> {
    const all = Note.values.flatMap(note => Mode.values.map(mode => new Scale(note, mode)));
    return this.repository.saveAll(all).pipe(
      tap(scales => this._scales$.next(scales))
    );
  }

  public refresh(): void {
    this.repository.getAll().subscribe(s => this._scales$.next(s));
  }
}
