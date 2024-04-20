import moment from "moment";
import EventRepository from "../persistance/event-repository.js";
// funkcia na presunutie eventov na dalsi den
export const moveUnfinishedEventsJob = () => {
  var today = new Date();
// sleduje sa ci je 23.50
  if (today.getHours() == 23 && today.getMinutes() > 50) {
    const repository = new EventRepository();
    let allTodayEvents = repository.getAllEventsInDateForJob(new Date());
    // cyklus pre vsetky eventy, 
    for (let i = 0; i < allTodayEvents.length; i++) {
      const event = allTodayEvents[i];
      // beru vsetky eventy z dna
      if (!event.finished && event.passUnfinishedTasks) {
          // negacia dokonceneho eventu a ci maju zaskrtnetu aby sa presunuli 
          var tomorrow = moment(event.date).add(1, 'days');
          event.date = tomorrow.toDate();
          repository.update(event.id, event.date, event.finished, event);
      }
    }
  }
};