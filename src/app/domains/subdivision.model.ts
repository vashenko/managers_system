import {ShowedManager} from './showed-manager';
import {ClientsAndOrdersSummary} from './clients-and-orders-summary.model';

export class Subdivision {
  constructor(public direction: string,
              public managers: ShowedManager[],
              public MondayClientsAndOrdersSummary: ClientsAndOrdersSummary,
              public TuesdayClientsAndOrdersSummary: ClientsAndOrdersSummary,
              public WednesdayClientsAndOrdersSummary: ClientsAndOrdersSummary,
              public ThursdayClientsAndOrdersSummary: ClientsAndOrdersSummary,
              public FridayClientsAndOrdersSummary: ClientsAndOrdersSummary,
              public AnyDayClientsAndOrdersSummary: ClientsAndOrdersSummary) {

  }
}
