export const repositories=()=>
{
    return {
        students:StudentsRepository,
        grades:GradesRepository
    };
};


const studentsMockData=[
    {
        id:1,
        firstName:"John",
        lastName:"Doe",
        dateOfBirth:"2000-01-01",
        class:"1A",
    },
    {
        id:2,
        firstName:"Jane",
        lastName:"Doe",
        dateOfBirth:"2000-01-01",
        class:"1A",
    },
    {
        id:3,
        firstName:"John",
        lastName:"Smith",
        dateOfBirth:"2000-01-01",
        class:"1A",
    }
]
const StudentsRepository=()=>
{
    const data=studentsMockData; //to be changed to database
    return {
        getAll:()=>	
        {
            return data;
        },
        getById:(id)=>
        {
            return data.find((student)=>student.id===id);
        },
    }
}

const gradesMockData=[
    {
        id:1,
        studentId:1,
        grade:5,
        subject:"Math", 
    },
    {
        id:2,
        studentId:1,
        grade:4,
        subject:"Math",
    },
    {
        id:3,
        studentId:2,
        grade:3,
        subject:"Math",
    },
]
const GradesRepository=()=>
{
    const data=gradesMockData; //to be changed to database
    return {
        getAll:()=>	
        {
            return data;
        },
        getById:(id)=>
        {
            return data.find((note)=>note.id===id);
        },
        getByStudentId:(studentId)=>
        {
            return data.filter((note)=>note.studentId===studentId);
        },
        getWithStudentFullName:()=>
        {
            return data.map((note)=>
            {
                const student=StudentsRepository().getById(note.studentId);
                return {
                    ...note,
                    student:student.firstName+" "+student.lastName,
                }
            });
        }
    }
}