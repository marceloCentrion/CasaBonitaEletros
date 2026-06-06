import { asyncFetch } from "./config";
export default ({
    getAllSite: async () => {
        return await asyncFetch('todos-projetos', 'projetos');
    },
})