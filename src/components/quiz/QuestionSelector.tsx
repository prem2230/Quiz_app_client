import { Box, Button, CircularProgress, Divider, IconButton, InputAdornment, TextField, Typography, useTheme } from "@mui/material"
import { useStyles } from "./quiz.styles"
import { Clear, Search } from "@mui/icons-material";
import useQuestion from "../question/hooks";
import { useEffect, useRef, useState } from "react";
import ListLoader from "../loaders/ListLoader";

type QuestionSelectorProps = {
    selectedQuestions: any;
    setSelectedQuestions?: React.Dispatch<React.SetStateAction<any>>;
};

const QuestionSelector = ({ selectedQuestions, setSelectedQuestions }: QuestionSelectorProps) => {
    const styles = useStyles();
    const theme = useTheme();
    const { loadAllQuestions, questions, pagination, loading, cachedQuestions } = useQuestion();
    const [searchTerm, setSearchTerm] = useState("");
    const [displayQuestions, setDisplayQuestions] = useState<any[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);
    const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        loadAllQuestions();

        return () => {
            if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
            }
        };
    }, [])

    useEffect(() => {
        if (searchTerm.trim() === '') {
            setDisplayQuestions(cachedQuestions);
        } else {
            const filteredCached = cachedQuestions.filter(question =>
                question.question.toLowerCase().includes(searchTerm.toLowerCase())
            );

            const uniqueQuestionsMap = new Map();

            filteredCached.forEach(question => {
                uniqueQuestionsMap.set(question._id, question);
            });

            questions.forEach(question => {
                uniqueQuestionsMap.set(question._id, question);
            });

            const mergedQuestions = Array.from(uniqueQuestionsMap.values());
            setDisplayQuestions(mergedQuestions);
        }
    }, [questions, cachedQuestions, searchTerm]);

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;

            if (scrollTop + clientHeight >= scrollHeight - 20) {
                loadMoreQuestions();
            }
        }
    }

    const loadMoreQuestions = () => {
        if (pagination.hasMore && !loading) {
            loadAllQuestions({
                page: pagination.page + 1,
                limit: 8,
                search: searchTerm || undefined
            })
        }
    };

    const handleSearch = () => {
        loadAllQuestions({
            page: 1,
            limit: 8,
            search: searchTerm
        });
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        if (value.trim() === '') {
            setDisplayQuestions(cachedQuestions);
        } else {
            const filteredCachedQuestions = cachedQuestions.filter(question =>
                question.question.toLowerCase().includes(value.toLowerCase())
            );

            setDisplayQuestions(filteredCachedQuestions);

            if (filteredCachedQuestions.length < 8) {
                searchTimeoutRef.current = setTimeout(() => {
                    loadAllQuestions({
                        page: 1,
                        limit: 8,
                        search: value
                    });
                }, 500);
            }
        }
    };

    const handleClearSearch = () => {
        setSearchTerm("");
        loadAllQuestions({
            page: 1,
            limit: 8
        });
    }

    const handleAddQuestions = (question: any) => {
        if (setSelectedQuestions) {
            setSelectedQuestions((prev: any) => {
                const exists = prev.some((q: any) => {
                    const qId = q._id || q;
                    return qId === question._id;
                });

                if (!exists) {
                    return [...prev, question];
                }
                return prev;
            });
        }
    }

    const handleRemoveQuestion = (question: any) => {
        if (setSelectedQuestions) {
            setSelectedQuestions((prev: any) => {
                const updatedQuestions = [...prev];
                const index = updatedQuestions.findIndex((q: any) => {
                    const qId = typeof q === 'string' ? q : q._id;
                    const questionId = typeof question === 'string' ? question : question._id;
                    return qId === questionId;
                });

                if (index !== -1) {
                    updatedQuestions.splice(index, 1);
                }

                return updatedQuestions;
            });
        }
    }

    const isQuestionSelected = (questionId: string) => {
        return selectedQuestions.some((q: any) => {
            const qId = q._id || q;
            return qId === questionId;
        });
    };

    const renderSkeletons = () => {
        return Array(5).fill(0).map((_, index) => (
            <ListLoader index={index} />
        ));
    };

    const renderQuestionBox = () => {
        if (loading && displayQuestions.length === 0) {
            return renderSkeletons();
        }
        if (!loading && displayQuestions.length === 0) {
            return (
                <Box sx={styles.noQuestionsMessage}>
                    <Typography>No questions available</Typography>
                </Box>
            )
        }
    }

    return (
        <Box sx={{ mt: 1 }}>
            <Box sx={styles.searchContainer}>
                <Box sx={styles.searchBox}>
                    <TextField
                        fullWidth
                        name="search"
                        placeholder="Search questions..."
                        variant="standard"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="start">
                                    <IconButton
                                        aria-label="search"
                                        onClick={handleSearch}
                                        size="small"
                                    ><Search sx={{ color: theme.palette.text.primary }} />
                                    </IconButton>
                                    {searchTerm && (
                                        <IconButton
                                            aria-label="clear search"
                                            onClick={handleClearSearch}
                                            edge="end"
                                            size="small"
                                        >
                                            <Clear fontSize="small" />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                            )
                        }}
                        sx={styles.searchField}
                    />
                    <Button onClick={handleSearch} variant="contained" sx={styles.searchButton}>
                        Search
                    </Button>
                </Box>
            </Box>
            <Box ref={containerRef} onScroll={handleScroll} sx={styles.questionListContainer}>
                {selectedQuestions.length > 0 &&
                    <>{
                        selectedQuestions.map((question: any) => (
                            <Button
                                fullWidth
                                centerRipple
                                onClick={() => handleRemoveQuestion(question)}
                                key={question._id}
                                sx={{
                                    ...styles.questionItem,
                                    ...styles.questionItemSelected,
                                }}
                            >
                                <Typography sx={styles.questionText}>
                                    {question.question}
                                </Typography>
                                <Typography sx={styles.markText}>
                                    {question.marks} mark
                                </Typography>
                            </Button>
                        ))
                    } < Divider sx={{ my: 2 }} /></>}

                {displayQuestions.length > 0 && displayQuestions
                    .filter(question => !isQuestionSelected(question._id))
                    .map((question) => {
                        return (
                            <Button fullWidth centerRipple onClick={() => handleAddQuestions(question)} key={question._id} sx={{ ...styles.questionItem }}>
                                <Typography sx={styles.questionText}>
                                    {question.question}
                                </Typography>
                                <Typography sx={styles.markText}>
                                    {question.marks} mark
                                </Typography>
                            </Button>
                        )
                    })}
                {renderQuestionBox()}
                {loading && displayQuestions.length > 0 &&
                    <Box>
                        <CircularProgress size={24} sx={styles.loaderDiv} />
                    </Box>}
            </Box>
        </Box>
    )
}

export default QuestionSelector