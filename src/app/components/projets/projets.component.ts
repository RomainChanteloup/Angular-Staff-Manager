import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { DirectusService } from 'src/app/services/directus.service';

@Component({
  selector: 'app-projets',
  templateUrl: './projets.component.html',
  styleUrls: ['./projets.component.scss'],
})
export class ProjetsComponent implements OnInit {
  constructor(private directusService: DirectusService) {}
  ngOnInit(): void {
    this.directusService.getPlanStaff().subscribe((data: any) => {
      this.planStaff = data.data;
      this.directusService.getIterations().subscribe((data: any) => {
        this.iterationsList = data.data;
        this.loadChartData();
      });
    });
  }
  planStaff: any;
  iterationsList: any;
  chartLoaded = false;

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        min: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'ETP par itération et projet',
      },
    },
  };
  barChartType: ChartType = 'bar';

  barChartData: ChartData<'bar'>;
  // = {
  //   labels: [
  //     // 'PI 1',
  //     // 'PI 1.2'
  //   ],
  //   datasets: [
  //     // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
  //     // { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' },
  //     // { data: [3, 5, 7, 9, 3, 2, 0], label: 'Series C' },
  //   ],
  // };

  loadChartData() {
    // sumETP = {
    //   PI: string,
    //   ProjetNom: string,
    //   ETP: number,
    // }
    //make some opperation to get all nescessary data
    let distinctPIGlobal: any[] = [
      ...new Set(this.iterationsList.map((item: { Label: any }) => item.Label)),
    ];

    let sumETP: any = [];
    for (let record of this.planStaff) {
      let iterationOfRecord = this.getIterationsFromStartEnd(
        record.Iteration_debut.Label,
        record.Iteration_fin.Label,
        distinctPIGlobal
      );
      for (let iterationLabel of iterationOfRecord) {
        let projectAndPiAlreadyThere = sumETP.find(
          (el: any) =>
            el.PI === iterationLabel && el.Projet === record.Projet.Nom
        );

        if (!projectAndPiAlreadyThere) {
          sumETP.push({
            PI: iterationLabel,
            Projet: record.Projet.Nom,
            ETP: parseInt(record.Charge),
          });
        } else {
          projectAndPiAlreadyThere.ETP += parseInt(record.Charge);
        }
      }
    }

    // now loading data in te chart
    let distinctProjects = [
      ...new Set(sumETP.map((item: { Projet: any }) => item.Projet)),
    ];

    let datasetList: any[] = [];
    for (let projet of distinctProjects) {
      let projetNom = projet;
      let listeETP: any[] = [];
      for (let it of distinctPIGlobal) {
        let corespondingETP = sumETP.find(
          (el: any) => el.PI === it && el.Projet === projet
        );
        if (corespondingETP) {
          listeETP.push(corespondingETP.ETP);
        } else {
          listeETP.push(0);
        }
      }
      datasetList.push({ data: listeETP, label: projetNom });
    }
    this.barChartData = { labels: distinctPIGlobal, datasets: datasetList };
    this.chartLoaded = true;
  }

  getIterationsFromStartEnd(
    start: string,
    end: string,
    iterationList: string[]
  ) {
    let firstIteration = iterationList.find((el) => el === start);
    let lastIteration = iterationList.find((el) => el === end);
    if (!firstIteration || !lastIteration) {
      // not start increment or end increment valid
      return [];
    }
    let res: string[] = [firstIteration];
    let currentIteration = firstIteration;
    while (currentIteration !== lastIteration) {
      let actualIncrement = currentIteration.substring(
        0,
        currentIteration.indexOf('.')
      );
      let actualIteration = currentIteration.substring(
        currentIteration.indexOf('.') + 1
      );
      // case 1.1 and next is 1.2
      let nextIterPossible =
        actualIncrement + '.' + (parseInt(actualIteration) + 1).toString();
      let nextIter = iterationList.find((el) => el === nextIterPossible);
      if (nextIter) {
        res.push(nextIter);
        currentIteration = nextIter;
        continue;
      } else {
        // case 1.1 and next is 2.1
        let nextIterPossible =
          (parseInt(actualIncrement) + 1).toString() + '.1';
        let nextIter = iterationList.find((el) => el === nextIterPossible);
        if (nextIter) {
          res.push(nextIter);
          currentIteration = nextIter;
          continue;
        } else {
          // case there is no 1.2 or 2.1 so the current iter is the last
          return res;
        }
      }
    } //case where start is the same as the end
    return res;
  }
}
