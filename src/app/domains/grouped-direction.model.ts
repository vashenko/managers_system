import {ShowedManager} from './showed-manager';

export class GroupedByDirection {
  constructor(public direction: string,
              public managers: ShowedManager[],
              public MondayClientsSummaray: number,
              public TuesdayClientsSummaray: number,
              public WednesdayClientsSummaray: number,
              public ThursdayClientsSummaray: number,
              public FridayClientsSummaray: number,
              public AnyDayClientsSummaray: number,
              public MondayOrdersSummaray: number,
              public TuesdayOrdersSummaray: number,
              public WednesdayOrdersSummaray: number,
              public ThursdayOrdersSummaray: number,
              public FridayOrdersSummaray: number,
              public AnyDayOrdersSummaray: number) {

  }
}
