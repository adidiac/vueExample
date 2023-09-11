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
        getObjectProps:()=>
        {
            return [{ text: 'First Name',value: 'firstName',type:'text',placeholder:'Enter First Name' ,rules: [val => (val || '').length > 0 || 'This field is required'],},
              { text: 'Last Name', value: 'lastName',type:'text',placeholder:'Enter Last Name' ,rules: [val => (val || '').length > 0 || 'This field is required'],},
              {text:'Date of Birth',value:'dateOfBirth',type:"date",placeholder:'Enter Date of Birth'},
              {text:'Class',value:'class',type:'text',placeholder:'Enter Class'}
            ]
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
        },
        getWithStudentFullNameByStudentId:(studentId)=>
        {
            return data.filter((note)=>note.studentId===studentId).map((note)=>
            {
                const student=StudentsRepository().getById(note.studentId);
                return {
                    ...note,
                    student:student.firstName+" "+student.lastName,
                }
            });
        },
        getObjectProps:()=>
        {
            return [{text:'Student',value:'student',type:'select',options:StudentsRepository().getAll().map((student)=>({text:student.firstName+" "+student.lastName,value:student.id}))},
                {text:'Subject',value:'subject',type:'select',placeholder:'Enter Subject', options:[{text:'Math',value:'Math'},{text:'English',value:'English'},{text:'Science',value:'Science'}]},
                {text:'Grade',value:'grade',type:'number',placeholder:'Enter Grade'},
            ]
        },
    }
}