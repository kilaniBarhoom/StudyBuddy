class APIFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }
    searchByMajor() {
        const q = this.queryStr.subject ? {
            subject: {
                $regex: this.queryStr.subject,
                $options: 'i'
            },
            type: {
                $regex: this.queryStr.type,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({ ...q })
        return this
    }
}

export default APIFeatures