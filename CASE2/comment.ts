type IComment = {
    commentId: number;
    commentContent: string;
    replies?: IComment[];
}
const comments: IComment[] = [
    {
        commentId: 1,
        commentContent: 'Hai',
        replies: [
            {
                commentId: 11,
                commentContent: 'Hai juga',
                replies: [
                    {
                        commentId: 111,
                        commentContent: 'Haai juga hai jugaa'
                    },
                    {
                        commentId: 112,
                        commentContent: 'Haai juga hai jugaa'
                    }
                ]
            },
        {
            commentId: 12,
            commentContent: 'Hai juga',
            replies: [
                {
                    commentId: 121,
                    commentContent: 'Haai juga hai jugaa'
                }
            ]
        }
        ]
    },
    {
        commentId: 2,
        commentContent: 'Halooo'
    }
]


function countTotalComments(commentsList: IComment[]): number {
    return commentsList.reduce((total, comment) => {
        // 1. Hitung komentar saat ini (1)
        let currentCount = 1;

        // 2. Jika komentar memiliki replies, hitung secara rekursif
        if (comment.replies && comment.replies.length > 0) {
            currentCount += countTotalComments(comment.replies);
        }

        return total + currentCount;
    }, 0);
}

// Eksekusi fungsi
const totalComments = countTotalComments(comments);

console.log(`Total komentar: ${totalComments} komentar`);
