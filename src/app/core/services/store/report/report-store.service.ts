import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TurnReport } from '../../../types/report/turn-report.interface';

@Injectable({ providedIn: 'root' })
export default class ReportStoreService {
  private turnReportsSubject = new BehaviorSubject<TurnReport[]>([
    {
      factionsSnapshot: [],
    },
  ]);
  turnReports$ = this.turnReportsSubject.asObservable();

  updateAll(reports: TurnReport[]) {
    this.turnReportsSubject.next([...reports]);
  }

  updateSingle() {}

  getAll(): TurnReport[] {
    return this.turnReportsSubject.getValue();
  }

  addReport(report: TurnReport) {
    const updatedReports = [...this.getAll(), report];
    this.turnReportsSubject.next(updatedReports);
  }
}
