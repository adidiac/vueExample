export const repositories=()=>
{
    return {
        student:StudentRepository(),
        note:NoteRepository()
    };
}


const studentMockData=[
    {
        id:1,
        name:"John Doe",
        email:"",
    },
    {
        id:2,
        name:"Jane Doe",
        email:"",
    },
]
const StudentRepository=()=>
{
    const data=studentMockData; //to be changed to database
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

const notesMockData=[
    {
        id:1,
        studentId:1,
        title:"Note 1",
        content:"Content 1",
    },
    {
        id:2,
        studentId:1,
        title:"Note 2",
        content:"Content 2",
    },
    {
        id:3,
        studentId:2,
        title:"Note 3",
        content:"Content 3",
    },
]
const NoteRepository=()=>
{
    const data=notesMockData; //to be changed to database
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
    }
}