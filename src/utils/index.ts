interface QuestionData {
    question: string,
    _id?: string,
    options: [
        {
            _id?: string
            text: string,
            isCorrect: boolean
        }
    ],
    explanation: string,
    marks: number,
    createdBy?: string,
    updatedBy?: string,
    createdAt?: string,
    updatedAt?: string,

}

interface Question {
    question?: string,
    _id: string,
    options?: [
        {
            _id?: string
            text: string,
            isCorrect: boolean
        }
    ],
    explanation?: string,
    marks?: number,
    createdBy?: string,
    updatedBy?: string,
    createdAt?: string,
    updatedAt?: string,
}
interface Quiz {
    _id?: string,
    title: string,
    description: string,
    duration: number,
    difficulty: 'easy' | 'medium' | 'hard',
    questions: Question[],
}

interface LoginPayload {
    email?: string,
    username?: string,
    number?: number,
    password: string
}

interface RegisterFormData {
    email: string,
    username: string,
    password: string,
    confirmPassword: string,
    role: 'user' | 'admin',
    number: number | null
}
interface RegisterPayload {
    email: string,
    username: string,
    password: string,
    role: 'user' | 'admin',
    number: number | null
}

// Helper function to format timestamp
export const formatTimeAgo = (timestamp: string): string => {
    if (!timestamp) return "Unknown time";

    const date = new Date(timestamp);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (isNaN(date.getTime())) return "Invalid date";

    if (diffInSeconds < 60) {
        return "just now";
    }

    if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    }

    if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    }

    if (diffInSeconds < 604800) {
        const days = Math.floor(diffInSeconds / 86400);
        if (days === 1) return "yesterday";
        return `${days} days ago`;
    }

    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

export const getTimestampInfo = (createdAt: string, updatedAt: string): { prefix: string, time: string } => {
    if (!createdAt && !updatedAt) return { prefix: "", time: "Unknown time" };

    const createdDate = new Date(createdAt);
    const updatedDate = new Date(updatedAt);

    const isCreatedValid = !isNaN(createdDate.getTime());
    const isUpdatedValid = !isNaN(updatedDate.getTime());

    if (isCreatedValid && !isUpdatedValid) return { prefix: "Created", time: formatTimeAgo(createdAt) };
    if (!isCreatedValid && isUpdatedValid) return { prefix: "Updated", time: formatTimeAgo(updatedAt) };

    if (updatedDate > createdDate) {
        return { prefix: "Updated", time: formatTimeAgo(updatedAt) };
    } else {
        return { prefix: "Created", time: formatTimeAgo(createdAt) };
    }
};

//Validator for create-update quiz payload 
export const quizPayloadValidator = (data: Quiz) => {
    if (!data.title.length) {
        return { isValid: false, errorMessage: 'Title is required' };
    }
    if (data.title.length < 5) {
        return { isValid: false, errorMessage: 'Title should be at least 5 characters' };
    }
    if (!data.description.length) {
        return { isValid: false, errorMessage: 'Description is required' };
    }
    if (data.description.length < 10) {
        return { isValid: false, errorMessage: 'Description should be at least 10 characters' };
    }
    if (data.questions.length < 1) {
        return { isValid: false, errorMessage: 'At least one question is required' };
    }
    return { isValid: true };
}

//Validator for create-update question payload
export const questionPayloadValidator = (data: QuestionData) => {
    if (!data.question.length) {
        return { isValid: false, errorMessage: 'Question is required' };
    }
    if (data.question.length < 10) {
        return { isValid: false, errorMessage: 'Question should be at least 10 characters' };
    }
    if (!data.explanation.length) {
        return { isValid: false, errorMessage: 'Explanation is required' };
    }
    if (data.explanation.length < 10) {
        return { isValid: false, errorMessage: 'Explanation should be at least 10 characters' };
    }
    if (!data.marks) {
        return { isValid: false, errorMessage: 'Marks is required' };
    }
    if (data.marks > 10 || data.marks <= 0) {
        return { isValid: false, errorMessage: 'Marks should be between 1 to 10' };
    }
    if (data.options.length < 2) {
        return { isValid: false, errorMessage: 'At least two options are required' };
    }
    if (!data.options.some((opt) => opt.isCorrect)) {
        return { isValid: false, errorMessage: 'At least one option should be correct' };
    }
    return { isValid: true };
}

//Validator for login payload
export const loginPayloadValidator = (identifier: string, password: string): { isValid: boolean, payload?: LoginPayload, errorMessage?: string } => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberPattern = /^\d+$/;
    const usernamePattern = /^[a-zA-Z0-9_]+$/;

    if (!identifier || !password) {
        return { isValid: false, errorMessage: 'Please fill in all fields.' };
    }

    if (password.length < 6) {
        return { isValid: false, errorMessage: 'Password must be at least 6 characters' };
    }

    if (emailPattern.test(identifier)) {
        return { isValid: true, payload: { email: identifier, password } };
    }

    if (numberPattern.test(identifier)) {
        if (identifier.length !== 10) {
            return { isValid: false, errorMessage: 'Please enter a valid phone number.' };
        }
        return { isValid: true, payload: { number: Number(identifier), password } };
    }

    if (usernamePattern.test(identifier)) {
        return { isValid: true, payload: { username: identifier, password } }
    };
    return { isValid: false, errorMessage: 'Please enter a valid email, number, or username.' }
};

//Validator for register payload
export const registerPayloadValidator = (formData: RegisterFormData): { isValid: boolean, payload?: RegisterPayload, errorMessage?: string } => {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const numberPattern = /^\d+$/;
    const usernamePattern = /^[a-zA-Z0-9_]+$/;

    if (!formData?.username || !formData?.email || !formData?.number || !formData?.password || !formData?.confirmPassword) {
        return { isValid: false, errorMessage: 'Please fill in all fields.' };
    }

    if (formData?.password.length < 6) {
        return { isValid: false, errorMessage: 'Password must be at least 6 characters' }
    }

    if (!emailPattern.test(formData?.email)) {
        return { isValid: false, errorMessage: 'Please enter a valid email address.' }
    }

    if (formData?.number !== null) {
        if (!numberPattern.test(String(formData?.number))) {
            return { isValid: false, errorMessage: 'Phone number must contain only digits.' }
        }
        if (String(formData?.number).length !== 10) {
            return { isValid: false, errorMessage: 'Please enter a valid 10-digit phone number.' }
        }
    }

    if (!usernamePattern.test(formData?.username)) {
        return { isValid: false, errorMessage: 'Username can only contain letters, numbers, and underscores.' }
    }

    if (formData?.password !== formData?.confirmPassword) {
        return { isValid: false, errorMessage: 'Passwords do not match.' }
    }

    return {
        isValid: true,
        payload: {
            email: formData?.email,
            username: formData?.username,
            password: formData?.password,
            role: formData?.role,
            number: formData?.number ? Number(formData?.number) : null,
        }
    }
};

// standard case helper function
export const standardCase = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// helper function to get difficulty color
export const getDifficultyStyle = (difficulty: string, styles: any) => {
    switch (difficulty) {
        case 'easy':
            return styles.easy;
        case 'medium':
            return styles.medium;
        case 'hard':
            return styles.hard;
        default:
            return styles.easy;
    }
};

// difficulty toggle helper function
export const getActivePositionDifficulty = (difficulty: string) => {
    switch (difficulty) {
        case 'easy': return '3px';
        case 'medium': return 'calc(33.33% - 0px)';
        case 'hard': return 'calc(66.66% - 3px)';
        default: return '3px';
    }
};

// duration toggle helper function
export const getActivePositionDuration = (duration: number) => {
    switch (duration) {
        case 30:
            return '1.5%';
        case 60:
            return '26%';
        case 90:
            return '50.5%';
        case 120:
            return '75%';
        default:
            return '1.5%';
    }
};