export const APP_NAME = 'KOBATASK';

export const ROUTES = {
    HOME: '/home',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/profile',
    EDIT_PROFILE: '/edit',
    CREATE_TASK: '/tasks/create',
    TASKS: '/tasks',
    ABOUT: '/about',
} as const;

export const ERROR_MESSAGES = {
    REQUIRED_FIELDS: 'preencha todos os campos.',
    GENERIC: 'Algo deu errado. Tente novamente mais tarde.',
    NETWORK: 'Erro de conexão. Verifique sua internet.',
    UNAUTHORIZED: 'Não autorizado. Faça login novamente.',
} as const;

export const SUCCESS_MESSAGES = {
    LOGIN: 'Login realizado com sucesso!',
    REGISTER: 'Conta criada com sucesso!',
    LOGOUT: 'Logout realizado com sucesso!',
    TASK_CREATED: 'Tarefa criada com sucesso!',
    TASK_UPDATED: 'Tarefa atualizada com sucesso!',
    TASK_DELETED: 'Tarefa deletada com sucesso!',
    PROFILE_UPDATED: 'Perfil atualizado com sucesso!',
} as const;

export const TASK_LABELS = {
    CATEGORIES: {
        Work: 'Trabalho',
        Project: 'Projeto',
        Personal: 'Pessoal',
    },
    STATUS: {
        Pending: 'Pendente',
        Inprogress: 'Em andamento',
        Completed: 'Concluído',
        Overdue: 'Atrasado',
    },
    PRIORITIES: {
        Low: 'Baixa',
        Medium: 'Média',
        High: 'Alta',
    },
} as const;

export const translateTaskKey = (key: string | undefined): string => {
    if (!key) return '';
    
    const allLabels = {
        ...TASK_LABELS.CATEGORIES,
        ...TASK_LABELS.STATUS,
        ...TASK_LABELS.PRIORITIES,
    };

    return (allLabels as Record<string, string>)[key] || key;
};