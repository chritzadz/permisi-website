export class FormsController {
    private service: FormsService;

    constructor() {
        this.service = new FormsService();
    }

    public async getAll(req: Request, res: Response): Promise<void> {
        const replies = await this.service.getAllReplies();
        res.json(replies);
    }
}
