import Joi from 'joi';

interface LoginInput {
    email: string;
    password: string;
}

const loginSchema = Joi.object<LoginInput>({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            'any.required': 'Email is required',
            'string.email': 'Invalid email format',
            'string.empty': 'Email must not be empty'
        }),
    password: Joi.string()
        .min(6)
        .max(50)
        .required()
        .messages({
            'any.required': 'Password is required',
            'string.min': 'Password must be at least {#limit} characters long',
            'string.max': 'Password must not exceed {#limit} characters',
            'string.empty': 'Password must not be empty'
        })
});


const validRoles = ["ADMIN", "STUDENT"];

const CreateUserSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required',
    }),
    name: Joi.string().required().messages({
        'string.empty': 'Name cannot be empty',
        'any.required': 'Name is required',
    }),
    password: Joi.string()
        .min(6)
        .max(50)
        .required()
        .messages({
            'any.required': 'Password is required',
            'string.min': 'Password must be at least {#limit} characters long',
            'string.max': 'Password must not exceed {#limit} characters',
            'string.empty': 'Password must not be empty'
        }),
    role: Joi.string().valid(...validRoles).required().messages({
        'any.only': 'Role must be either ADMIN or STUDENT',
        'any.required': 'Role is required',
    }),
    classId: Joi.number().when('role', {
        is: 'STUDENT',
        then: Joi.required().messages({
            'number.base': 'Class ID must be a number',
            'any.required': 'Class ID is required for students',
        }),
    }),
});


type Role = 'ADMIN' | 'STUDENT';

interface UserUpdate {
    name?: string;
    role?: Role;
    password?: string;
    classId?: number;
}

const userUpdateSchema = Joi.object<UserUpdate>({
    name: Joi.string().messages({
        'string.empty': 'Name cannot be empty',
        'string.base': 'Name must be a string'
    }),
    role: Joi.string().valid('ADMIN', 'STUDENT').messages({
        'any.only': 'Role must be either ADMIN or STUDENT',
        'string.base': 'Role must be a string'
    }),
    password: Joi.string()
        .min(6)
        .max(50)
        .optional()
        .messages({
            'any.required': 'Password is required',
            'string.min': 'Password must be at least {#limit} characters long',
            'string.max': 'Password must not exceed {#limit} characters',
            'string.empty': 'Password must not be empty'
        }),
    classId: Joi.number().when('role', {
        is: 'STUDENT',
        then: Joi.required().messages({
            'any.required': 'Class ID is required for students',
            'number.base': 'Class ID must be a number'
        }),
        otherwise: Joi.optional().messages({
            'number.base': 'Class ID must be a number'
        })
    }),
}).min(1).messages({
    'object.min': 'At least one field is required'
});

interface ChapterInput {
    name: string;
    classId: number;
}

const chapterSchema = Joi.object<ChapterInput>({
    name: Joi.string().required().messages({
        'string.empty': 'Name cannot be empty',
        'any.required': 'Name is required',
    }),
    classId: Joi.number().required().messages({
        'number.base': 'Class ID must be a number',
        'any.required': 'Class ID is required',
    }),
});
const updateChpater = Joi.object<ChapterInput>({
    name: Joi.string().required().messages({
        'string.empty': 'Name cannot be empty',
        'any.required': 'Name is required',
    }),
    classId: Joi.number().optional().messages({
        'number.base': 'Class ID must be a number',
    }),
});

const NotesUpdateSchema = Joi.object({
    name: Joi.string().optional().messages({
      'string.base': 'Name should be a string',
    }),
    chapterId: Joi.number().optional().messages({
      'number.base': 'Chapter ID should be a number',
    }),
    classId: Joi.number().optional().messages({
      'number.base': 'Class ID should be a number',
    }),
    park: Joi.boolean().optional().messages({
      'boolean.base': 'Park should be a boolean value',
    }),
  }).or('name', 'chapterId', 'classId', 'park').messages({
    'object.missing': 'At least one of name, chapterId, classId or park is required',
  });


  const addNOte = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'name must be a string',
      'any.required': 'name is required',
    }),
    chapterId: Joi.number().integer().required().messages({
      'number.base': 'chapterId must be a number',
      'number.integer': 'chapterId must be an integer',
      'any.required': 'chapterId is required',
    }),
    classId: Joi.number().integer().required().messages({
      'number.base': 'classId must be a number',
      'number.integer': 'classId must be an integer',
      'any.required': 'classId is required',
    }),
    notesBase64: Joi.string().allow('').required().messages({
      'string.base': 'notesBase64 must be a string',
      'any.required': 'notesBase64 is required',
    }),
  });
export { loginSchema, CreateUserSchema, userUpdateSchema, chapterSchema, NotesUpdateSchema, addNOte, updateChpater };
