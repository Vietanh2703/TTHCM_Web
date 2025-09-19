import React, { useState, useEffect, useMemo, useCallback } from 'react'
import './QuizPage.css';

type Choice = {
    id: string
    text: string
}

type Question = {
    id: string
    text: string
    choices: Choice[]
    correctId: string
    explanation?: string
}

// Bộ câu hỏi mở rộng (50 câu)
const questionBank: Question[] = [
    {
        id: 'q1',
        text: 'Chủ tịch Hồ Chí Minh sinh năm nào?',
        choices: [
            { id: 'a', text: '1890' },
            { id: 'b', text: '1895' },
            { id: 'c', text: '1900' },
            { id: 'd', text: '1911' },
        ],
        correctId: 'a',
        explanation: 'Bác Hồ sinh ngày 19/5/1890 tại Kim Liên, Nam Đàn, Nghệ An.'
    },
    {
        id: 'q2',
        text: 'Tác phẩm "Đường Kách Mệnh" ra đời vào khoảng thời gian nào?',
        choices: [
            { id: 'a', text: '1925-1927' },
            { id: 'b', text: '1930-1931' },
            { id: 'c', text: '1941-1945' },
            { id: 'd', text: '1946-1950' },
        ],
        correctId: 'a',
        explanation: 'Đường Kách Mệnh tập hợp các bài giảng của Nguyễn Ái Quốc tại Quảng Châu (1925-1927).'
    },
    {
        id: 'q3',
        text: '"Cần, kiệm, liêm, chính" là nội dung thuộc hệ giá trị nào trong tư tưởng Hồ Chí Minh?',
        choices: [
            { id: 'a', text: 'Giá trị văn hoá' },
            { id: 'b', text: 'Đạo đức cách mạng' },
            { id: 'c', text: 'Chủ nghĩa xã hội' },
            { id: 'd', text: 'Đường lối kháng chiến' },
        ],
        correctId: 'b',
        explanation: 'Cần, kiệm, liêm, chính, chí công vô tư là những chuẩn mực đạo đức cách mạng.'
    },
    {
        id: 'q4',
        text: 'Năm nào Việt Nam giành độc lập, khai sinh nước Việt Nam Dân chủ Cộng hoà?',
        choices: [
            { id: 'a', text: '1930' },
            { id: 'b', text: '1945' },
            { id: 'c', text: '1954' },
            { id: 'd', text: '1975' },
        ],
        correctId: 'b',
        explanation: 'Ngày 2/9/1945, Chủ tịch Hồ Chí Minh đọc Tuyên ngôn Độc lập tại Quảng trường Ba Đình.'
    },
    {
        id: 'q5',
        text: 'Theo Bác Hồ, "Dễ trăm lần không dân cũng chịu, khó vạn lần dân liệu cũng xong" thể hiện nguyên tắc nào?',
        choices: [
            { id: 'a', text: 'Lấy dân làm gốc' },
            { id: 'b', text: 'Công – nông – trí' },
            { id: 'c', text: 'Đoàn kết quốc tế' },
            { id: 'd', text: 'Tự lực tự cường' },
        ],
        correctId: 'a',
        explanation: 'Tư tưởng "lấy dân làm gốc" thể hiện nhất quán trong quan điểm của Hồ Chí Minh.'
    },
    {
        id: 'q6',
        text: 'Đảng Cộng sản Việt Nam được thành lập vào năm nào?',
        choices: [
            { id: 'a', text: '1925' },
            { id: 'b', text: '1930' },
            { id: 'c', text: '1941' },
            { id: 'd', text: '1945' },
        ],
        correctId: 'b',
        explanation: 'Đảng Cộng sản Việt Nam được thành lập ngày 3/2/1930 tại Hồng Kông.'
    },
    {
        id: 'q7',
        text: 'Tên thật của Chủ tịch Hồ Chí Minh là gì?',
        choices: [
            { id: 'a', text: 'Nguyễn Sinh Cung' },
            { id: 'b', text: 'Nguyễn Tất Thành' },
            { id: 'c', text: 'Nguyễn Ái Quốc' },
            { id: 'd', text: 'Hồ Chí Minh' },
        ],
        correctId: 'a',
        explanation: 'Tên thật của Bác Hồ là Nguyễn Sinh Cung, sau đổi thành Nguy���n Tất Thành.'
    },
    {
        id: 'q8',
        text: 'Việt Minh được thành lập vào năm nào?',
        choices: [
            { id: 'a', text: '1930' },
            { id: 'b', text: '1941' },
            { id: 'c', text: '1945' },
            { id: 'd', text: '1954' },
        ],
        correctId: 'b',
        explanation: 'Mặt trận Việt Minh được thành lập ngày 19/5/1941 tại Pác Bó, Cao Bằng.'
    },
    {
        id: 'q9',
        text: 'Khẩu hiệu "Độc lập - Tự do - Hạnh phúc" xuất hiện lần đầu trong văn kiện nào?',
        choices: [
            { id: 'a', text: 'Tuyên ngôn Độc lập' },
            { id: 'b', text: 'Chính cương Việt Minh' },
            { id: 'c', text: 'Hiến pháp 1946' },
            { id: 'd', text: 'Di chúc Hồ Chí Minh' },
        ],
        correctId: 'a',
        explanation: 'Khẩu hiệu này xuất hiện trong Tuyên ngôn Độc lập ngày 2/9/1945.'
    },
    {
        id: 'q10',
        text: 'Theo Hồ Chí Minh, yếu tố nào quy��t định thành công của cách mạng?',
        choices: [
            { id: 'a', text: 'Vũ khí hiện đại' },
            { id: 'b', text: 'Nhân dân' },
            { id: 'c', text: 'Lãnh đạo tài ba' },
            { id: 'd', text: 'Điều kiện quốc tế' },
        ],
        correctId: 'b',
        explanation: 'Theo Bác Hồ, nhân dân là yếu tố quyết định thành công của cách mạng.'
    },
    {
        id: 'q11',
        text: 'Bác Hồ qua đời vào ngày nào?',
        choices: [
            { id: 'a', text: '2/9/1969' },
            { id: 'b', text: '19/5/1969' },
            { id: 'c', text: '3/2/1969' },
            { id: 'd', text: '30/4/1975' },
        ],
        correctId: 'a',
        explanation: 'Chủ tịch Hồ Chí Minh qua đời lúc 9h47 ngày 2/9/1969.'
    },
    {
        id: 'q12',
        text: 'Tác phẩm "Nhật ký trong tù" được viết khi nào?',
        choices: [
            { id: 'a', text: '1940-1941' },
            { id: 'b', text: '1942-1943' },
            { id: 'c', text: '1945-1946' },
            { id: 'd', text: '1954-1955' },
        ],
        correctId: 'b',
        explanation: '"Nhật ký trong tù" được viết trong thời gian Bác Hồ bị giam tại Trung Quốc (1942-1943).'
    },
    {
        id: 'q13',
        text: 'Theo Hồ Chí Minh, "Học, học nữa, học mãi" nhằm mục đích gì?',
        choices: [
            { id: 'a', text: 'Nâng cao trình độ cá nhân' },
            { id: 'b', text: 'Phục vụ nhân dân tốt hơn' },
            { id: 'c', text: 'Theo kịp thời đại' },
            { id: 'd', text: 'Tất cả các ý trên' },
        ],
        correctId: 'd',
        explanation: 'Việc học tập nhằm nâng cao trình độ để phục vụ nhân dân và theo kịp thời đại.'
    },
    {
        id: 'q14',
        text: 'Chiến thắng Điện Biên Phủ diễn ra vào năm nào?',
        choices: [
            { id: 'a', text: '1953' },
            { id: 'b', text: '1954' },
            { id: 'c', text: '1955' },
            { id: 'd', text: '1975' },
        ],
        correctId: 'b',
        explanation: 'Chiến thắng Điện Biên Phủ kết thúc ngày 7/5/1954.'
    },
    {
        id: 'q15',
        text: 'Hội nghị Geneva về Đông Dương diễn ra vào năm nào?',
        choices: [
            { id: 'a', text: '1953' },
            { id: 'b', text: '1954' },
            { id: 'c', text: '1955' },
            { id: 'd', text: '1956' },
        ],
        correctId: 'b',
        explanation: 'Hội nghị Geneva diễn ra từ tháng 4 đến tháng 7/1954.'
    },
    {
        id: 'q16',
        text: 'Theo Hồ Chí Minh, đức tính quan trọng nhất của cán bộ là gì?',
        choices: [
            { id: 'a', text: 'Thông minh' },
            { id: 'b', text: 'Trung thực' },
            { id: 'c', text: 'Can đảm' },
            { id: 'd', text: 'Chí công vô tư' },
        ],
        correctId: 'd',
        explanation: 'Chí công vô tư là đức tính cao quý nhất của người cán bộ theo Bác Hồ.'
    },
    {
        id: 'q17',
        text: 'Khái niệm "dân tộc giải phóng" trong tư tưởng Hồ Chí Minh có nghĩa gì?',
        choices: [
            { id: 'a', text: 'Giành độc lập dân tộc' },
            { id: 'b', text: 'Xóa bỏ áp bức giai cấp' },
            { id: 'c', text: 'Cả A và B' },
            { id: 'd', text: 'Chỉ có A' },
        ],
        correctId: 'c',
        explanation: 'Dân tộc giải phóng bao gồm cả giành độc lập dân tộc và giải phóng giai cấp.'
    },
    {
        id: 'q18',
        text: 'Bác Hồ từng sử dụng bao nhiêu bút danh khác nhau?',
        choices: [
            { id: 'a', text: 'Khoảng 50' },
            { id: 'b', text: 'Khoảng 75' },
            { id: 'c', text: 'Khoảng 160' },
            { id: 'd', text: 'Khoảng 200' },
        ],
        correctId: 'c',
        explanation: 'Bác Hồ đã sử dụng khoảng 160 bút danh khác nhau trong cuộc đời.'
    },
    {
        id: 'q19',
        text: 'Cuộc Tổng tuyển cử đầu tiên ở Việt Nam diễn ra khi nào?',
        choices: [
            { id: 'a', text: '6/1/1946' },
            { id: 'b', text: '2/9/1945' },
            { id: 'c', text: '19/5/1946' },
            { id: 'd', text: '3/2/1946' },
        ],
        correctId: 'a',
        explanation: 'Cuộc Tổng tuyển cử đầu tiên diễn ra ngày 6/1/1946.'
    },
    {
        id: 'q20',
        text: 'Theo Hồ Chí Minh, đoàn kết có ý nghĩa như thế n��o?',
        choices: [
            { id: 'a', text: 'Sức mạnh của dân tộc' },
            { id: 'b', text: 'Điều kiện thắng lợi' },
            { id: 'c', text: 'Truyền thống văn hóa' },
            { id: 'd', text: 'Cả A và B' },
        ],
        correctId: 'd',
        explanation: 'Đoàn kết vừa là sức mạnh của dân tộc vừa là điều kiện thắng lợi.'
    }
]

// Tạo thêm câu hỏi để đủ 50
for (let i = 21; i <= 50; i++) {
    questionBank.push({
        id: `q${i}`,
        text: `Câu hỏi số ${i} về tư tưởng Hồ Chí Minh?`,
        choices: [
            { id: 'a', text: `Đáp án A câu ${i}` },
            { id: 'b', text: `Đáp án B câu ${i}` },
            { id: 'c', text: `Đáp án C câu ${i}` },
            { id: 'd', text: `Đáp án D câu ${i}` },
        ],
        correctId: 'a',
        explanation: `Giải thích cho câu ${i}.`
    })
}

const QuizSystem: React.FC = () => {
    const [phase, setPhase] = useState<'intro' | 'quiz' | 'result'>('intro')
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentIndex, setCurrentIndex] = useState(0)
    const [answers, setAnswers] = useState<Record<string, string>>({})
    const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 phút = 1200 giây
    const [, setTimer] = useState<number | null>(null);

    // Lấy ngẫu nhiên 20 câu hỏi từ 50 câu
    const selectRandomQuestions = useCallback(() => {
        const shuffled = [...questionBank].sort(() => 0.5 - Math.random())
        return shuffled.slice(0, 20)
    }, [])

    // Tính điểm
    const score = useMemo(() => {
        return questions.reduce((acc, q) => acc + (answers[q.id] === q.correctId ? 1 : 0), 0)
    }, [answers, questions])

    // Timer
    useEffect(() => {
        let interval: number | null = null

        if (phase === 'quiz' && timeLeft > 0) {
            interval = window.setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        handleSubmit()
                        return 0
                    }
                    return prev - 1
                })
            }, 1000)
        }

        return () => {
            if (interval) window.clearInterval(interval)
        }
    }, [phase, timeLeft])

    // Auto save answers to prevent loss
    useEffect(() => {
        if (phase === 'quiz' && Object.keys(answers).length > 0) {
            const autoSave = setTimeout(() => {
                // Auto-save logic could be implemented here
            }, 2000)
            return () => clearTimeout(autoSave)
        }
    }, [answers, phase])

    // Xử lý thoát trang/tab
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (phase === 'quiz' && document.hidden) {
                handleReset()
            }
        }

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (phase === 'quiz') {
                e.preventDefault()
                return 'Bạn có chắc muốn tho��t? Tiến trình làm bài s�� bị mất.'
            }
        }

        document.addEventListener('visibilitychange', handleVisibilityChange)
        window.addEventListener('beforeunload', handleBeforeUnload)

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange)
            window.removeEventListener('beforeunload', handleBeforeUnload)
        }
    }, [phase])

    const handleStart = () => {
        const selectedQuestions = selectRandomQuestions()
        setQuestions(selectedQuestions)
        setAnswers({})
        setCurrentIndex(0)
        setTimeLeft(20 * 60)
        setPhase('quiz')
    }

    const handleAnswer = (questionId: string, choiceId: string) => {
        setAnswers(prev => ({ ...prev, [questionId]: choiceId }))
    }

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }

    const handlePrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => prev - 1)
        }
    }

    const handleSubmit = () => {
        setPhase('result')
    }

    const handleReset = () => {
        setPhase('intro')
        setQuestions([])
        setAnswers({})
        setCurrentIndex(0)
        setTimeLeft(20 * 60)
        setTimer(null);
    }

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const getAnsweredCount = () => {
        return Object.keys(answers).length
    }
    const getQuestionStatus = (index: number) => {
        const question = questions[index]
        if (!question) return 'unanswered'

        if (answers[question.id]) return 'answered'
        if (index === currentIndex) return 'current'
        return 'unanswered'
    }

    // Trang giới thiệu
    if (phase === 'intro') {
        return (
            <div className="quiz-container">
                <div className="intro-card">
                    <h1 className="intro-title">TRẮC NGHIỆM TƯ TƯỞNG HỒ CHÍ MINH</h1>

                    <div className="intro-rules">
                        <h2>📋 Quy định</h2>
                        <ul>
                            <li><strong>Thời gian:</strong> 20 phút</li>
                            <li><strong>Số câu:</strong> 20 câu</li>
                            <li><strong>Lưu ý:</strong> Không được thoát trang trong khi làm bài</li>
                        </ul>
                    </div>

                    <div className="intro-actions">
                        <button className="start-btn" onClick={handleStart}>
                            BẮT ĐẦU
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    // Trang làm bài
    if (phase === 'quiz') {
        const currentQuestion = questions[currentIndex]

        return (
            <div className="quiz-container">
                <div className="quiz-layout">
                    <div className="quiz-main">
                        <div className="quiz-header">
                            <h1>Câu {currentIndex + 1}/{questions.length}</h1>
                        </div>

                        <div className="question-card">
                            <div className="question-text">{currentQuestion.text}</div>
                        </div>

                        <div className="choices-container">
                            {currentQuestion.choices.map((choice) => {
                                const isSelected = answers[currentQuestion.id] === choice.id
                                return (
                                    <button
                                        key={choice.id}
                                        className={`choice-btn ${isSelected ? 'selected' : ''}`}
                                        onClick={() => handleAnswer(currentQuestion.id, choice.id)}
                                    >
                                        <span className="choice-bullet">
                                            {choice.id.toUpperCase()}.
                                        </span>
                                        <span className="choice-text">{choice.text}</span>
                                    </button>
                                )
                            })}
                        </div>

                        <div className="navigation-buttons">
                            <button
                                className="nav-btn prev-btn"
                                onClick={handlePrev}
                                disabled={currentIndex === 0}
                            >
                                ← Trước
                            </button>

                            {currentIndex < questions.length - 1 ? (
                                <button className="nav-btn next-btn" onClick={handleNext}>
                                    Sau →
                                </button>
                            ) : (
                                <button className="submit-btn" onClick={handleSubmit}>
                                    NỘP BÀI
                                </button>
                            )}
                        </div>
                    </div>

                    <div className="quiz-sidebar">
                        <div className={`timer ${timeLeft < 300 ? 'warning' : ''}`}>
                            <div className="timer-text">{formatTime(timeLeft)}</div>
                        </div>

                        <div className="question-grid">
                            <div className="grid-container">
                                {questions.map((_, index) => {
                                    const status = getQuestionStatus(index)
                                    return (
                                        <button
                                            key={index}
                                            className={`grid-item ${status}`}
                                            onClick={() => setCurrentIndex(index)}
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="progress-info">
                            Đã làm: {getAnsweredCount()}/{questions.length}
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    // Trang kết quả
    if (phase === 'result') {
        const percentage = Math.round((score / questions.length) * 100)
        const getGrade = (percent: number) => {
            if (percent >= 90) return { grade: 'Xuất sắc', color: '#4caf50', emoji: '🏆' }
            if (percent >= 80) return { grade: 'Giỏi', color: '#8bc34a', emoji: '🌟' }
            if (percent >= 70) return { grade: 'Khá', color: '#ffc107', emoji: '👍' }
            if (percent >= 50) return { grade: 'Trung bình', color: '#ff9800', emoji: '📚' }
            return { grade: 'Yếu', color: '#f44336', emoji: '💪' }
        }

        const gradeInfo = getGrade(percentage)

        return (
            <div className="quiz-container">
                <div className="result-card">
                    <div className="result-header">
                        <h1>KẾT QUẢ</h1>

                        <div className="score-display" style={{ backgroundColor: gradeInfo.color }}>
                            <div className="score-emoji">{gradeInfo.emoji}</div>
                            <div className="score-value">{score}/{questions.length} ({percentage}%)</div>
                            <div className="score-grade">{gradeInfo.grade}</div>
                        </div>
                    </div>

                    <div className="result-details">
                        <h2>Chi tiết</h2>

                        {questions.map((question, index) => {
                            const userAnswer = answers[question.id]
                            const isCorrect = userAnswer === question.correctId
                            const correctChoice = question.choices.find(c => c.id === question.correctId)
                            const userChoice = question.choices.find(c => c.id === userAnswer)

                            return (
                                <div key={question.id} className={`answer-review ${isCorrect ? 'correct' : 'incorrect'}`}>
                                    <div className="review-header">
                                        <span className="question-index">Câu {index + 1}</span>
                                        <span className={`result-badge ${isCorrect ? 'correct' : 'incorrect'}`}>
                                            {isCorrect ? '✓' : '✗'}
                                        </span>
                                    </div>

                                    <div className="review-question">{question.text}</div>

                                    <div className="review-answers">
                                        <div className="answer-row">
                                            <strong>Bạn chọn:</strong> {userChoice?.text || 'Chưa trả lời'}
                                        </div>
                                        <div className="answer-row correct-answer">
                                            <strong>Đáp án:</strong> {correctChoice?.text}
                                        </div>
                                    </div>

                                    {question.explanation && (
                                        <div className="explanation">
                                            {question.explanation}
                                        </div>
                                    )}
                                </div>
                            )
                        })}
                    </div>

                    <div className="result-actions">
                        <button className="action-btn retry-btn" onClick={handleReset}>
                            LÀM LẠI
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return null
}

export default QuizSystem
