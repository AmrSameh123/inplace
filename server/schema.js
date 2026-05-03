const mongoose = require('mongoose')

const volunteerSchema = new mongoose.Schema({
    user_name: {
        type: String,
        required: true
    },
    email: {
		type: String,
		required: true,
		lowercase: true,
		match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	},
    password: {
        type: String,
        required: true,
        select: false
    },
    experience_year: Number,
    preferences: [String],
    personality: String,
    programming_track: String,
    language_skills: [String],
    soft_skills: [String],
    skills: [String]
})

const organizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
		type: String,
		required: true,
		lowercase: true,
		match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
	},
    password: {
        type: String,
        required: true,
        select: false
    },
    phone: Number,
    status: String,
    focus_area: {
        type: String,
        required: true
    },
    location: {
        city: {
            type: String,
            required: true
        },
        neighbourhood: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        description: String
    }
})

const opportunitySchema = new mongoose.Schema({
    location: {
        city: {
            type: String,
            required: true
        },
        neighbourhood: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        description: String
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: true
    },
    language_skills: [String],
    soft_skills: [String],
    required_skills: [String],
    programming_skills: [String],
    capacity: Number,
    leading_org: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "organization",
        required: true
    }
})

const notificationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        immutable: true
    },
    status: {
        type: String,
        enum: ['read', 'unread'],
        required: true
    },
    recipientVolunteer: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "volunteer"
    },
    recipientOrganization: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "organization"
    }
}, {timestamps: true})

const applicationSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['accepted', 'rejected'],
        required: true
    },
    applicant: {
        type: mongoose.SchemaTypes.ObjectId,
        rquired: true,
        ref: "volunteer"
    },
    opportunity: {
        type: mongoose.SchemaTypes.ObjectId,
        required: true,
        ref: "opportunity"
    }
})

const dbModules = {
    Volunteer: mongoose.model("volunteer", volunteerSchema),
    Organization: mongoose.model("organization", organizationSchema),
    Opportunity: mongoose.model("opportunity", opportunitySchema),
    Notification: mongoose.model("notification", notificationSchema),
    Application: mongoose.model("application", applicationSchema)
}

module.exports = dbModules;