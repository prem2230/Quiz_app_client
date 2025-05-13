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