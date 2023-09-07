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
        getHeaders:()=>
        {
            return [{ text: 'First Name',value: 'firstName',},
              { text: 'Last Name', value: 'lastName' },
              {text:'Date of Birth',value:'dateOfBirth'},
              {text:'Class',value:'class'}]
        },
        getInputsFields:()=>
        {
            return [
                {label:'First Name',name:'firstName',type:'text',placeholder:'Enter First Name'},
                {label:'Last Name',name:'lastName',type:'text',placeholder:'Enter Last Name'},
                {label:'Date of Birth',name:'dateOfBirth',type:'date',placeholder:'Enter Date of Birth'},
                {label:'Class',name:'class',type:'text',placeholder:'Enter Class'},
            ]
        },
        getUpdateFieldsWihtValues:(student)=>
        {                
            return [
                {label:'First Name',name:'firstName',type:'text',value:student.firstName},
                {label:'Last Name',name:'lastName',type:'text',value:student.lastName},
                {label:'Date of Birth',name:'dateOfBirth',type:'date',value:student.dateOfBirth},
                {label:'Class',name:'class',type:'text',value:student.class},
            ]
        }
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
        getHeaders:()=>
        {
            return [{text:'Student',value:'student'},
                {text:'Subject',value:'subject'},
                {text:'Grade',value:'grade'}]
        },
        getInputsFields:()=>
        {
            return [
                {label:'Student',name:'studentId',type:'select',options:StudentsRepository().getAll().map((student)=>({text:student.firstName+" "+student.lastName,value:student.id}))},
                {label:'Subject',name:'subject',type:'select',placeholder:'Enter Subject', options:[{text:'Math',value:'Math'},{text:'English',value:'English'},{text:'Science',value:'Science'}]},
                {label:'Grade',name:'grade',type:'number',placeholder:'Enter Grade'},
            ]
        },
        getUpdateFieldsWihtValues:(note)=>
        {                
            return [
                {label:'Student',name:'studentId',type:'select',options:StudentsRepository().getAll().map((student)=>({text:student.firstName+" "+student.lastName,value:student.id})),value:note.studentId},
                {label:'Subject',name:'subject',type:'select',placeholder:'Enter Subject', options:[{text:'Math',value:'Math'},{text:'English',value:'English'},{text:'Science',value:'Science'}],value:note.subject},
                {label:'Grade',name:'grade',type:'number',placeholder:'Enter Grade',value:note.grade},
            ]
        }
    }
}