import { EventRepository } from "@/repository/EventRepository";
import { Event } from "@/model/Event";

export class EventService {
    repository: EventRepository = new EventRepository();

    public async getAllEvents() {
        return await this.repository.getAllEvents();
    }

    public async getEventById(id: number) {
        return await this.repository.getEventById(id);
    }

    public async getEventsWithPagination(page: number, limit: number, search?: string) {
        return await this.repository.getEventsWithPagination(page, limit, search);
    }

    public async createEvent(event: Pick<Event, 'name' | 'event_date' | 'description' | 'form_link'>) {
        return await this.repository.createEvent(event);
    }

    public async updateEvent(id: number, event: Partial<Pick<Event, 'name' | 'event_date' | 'description' | 'form_link'>>) {
        return await this.repository.updateEvent(id, event);
    }

    public async deleteEvent(id: number) {
        await this.repository.unlinkFormsForEvent(id);
        return await this.repository.deleteEvent(id);
    }
}
