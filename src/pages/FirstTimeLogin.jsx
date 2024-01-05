import Header from "../components/Header"
import { useState } from "react"

import axios from "axios"
import Button from "../components/Button"
import FormInputField from "../components/FormInputField"
import { API_BASE } from "../App"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"

// ashwani.dm21@satyug.edu.in
// abhijeet@sdiet



export default function FirstTimeLogin() {
    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        defaultValues: {
            email: "",
            name: "",
            roll_no: "",
            stream: "",
            desc: "",
            password: "",
            course: "",
            image: "",

            batch: "",
            company: "",
            position: "",
            expertise: "",
        }
    })

    // 0 -> email is not checked yet
    // 1 -> email is being used for the first time to login
    // 2 -> email is not in the database or already database already populated
    const [proceed, setProceed] = useState(0)

    const [userType, setUserType] = useState("")
    const [userImage, setUserImage] = useState("")
    const navigate = useNavigate()

    function verifyEmail(data) {
        console.log(data);
        axios.post(`${API_BASE}/auth`, {
            email: data.email,
            password: ""
        })
            .then((response) => {
                response = response.data
                console.log(response);
                if (!response) {
                    setProceed(2)
                }
                if (response && response.login === "first time") {
                    setProceed(1)
                    setUserType(response.type)
                }
            })
    }

    function convertImageToBase64(image) {
        var reader = new FileReader()
        reader.readAsDataURL(image[0])
        reader.onload = () => {
            setUserImage(reader.result)
        }
        reader.onerror = (error) => {
            console.log("File upload error", error);
        }
    }

    function onSubmit(data) {
        convertImageToBase64(data.image)

        if (userType === "alumni") {
            // console.log('a');
            axios.put(`${API_BASE}/update/alumni/${data.email}`, {
                ...data,
                image: userImage,
                expertise: data.expertise.split(", ")
            })
                .then((response) => {
                    // response = response.data

                })
                .catch((error) => {
                    // console.log(error);
                })
        }
        else {
            // console.log('s');
            axios.put(`${API_BASE}/update/student/${data.email}`, {
                ...data,
                image: userImage
            })
                .then((response) => {
                    // response = response.data

                })
                .catch((error) => {
                    // console.log(error);
                })
        }

        axios.put(`${API_BASE}/set/password/${data.email}`, {
            password: data.password,
            type: userType
        })
            .then((response) => {
                response = response.data
                if (response.success) {
                    navigate('/')
                }
            })
            .catch((error) => {
                // console.log(error);
            })
    }

    return (
        <div style={{ padding: "1em 1em 3em 1em" }}>
            <Header text={"Sign Up"} />
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* <FormInputField title={'Email'} label={'email'} regex={/[a-zA-Z0-9]/i} regexErrorMessage={"email must be of the valid format"} placeholder={'email'} register={register} errors={errors} /> */}
                <FormInputField title={'Email'} label={'email'} regex={/^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/i} regexErrorMessage={"email must be of the valid format"} placeholder={'email'} register={register} errors={errors} />
                {
                    proceed === 0
                        ? <Button text={"verify"} onClick={handleSubmit(verifyEmail)} />
                        : proceed === 1
                            ? userType === 'alumni'
                                ?
                                <div>
                                    <FormInputField title={'Name'} type={'text'} label={'name'} regex={/[A-Za-z]+/i} regexErrorMessage={"name must be all text"} placeholder={'roronoa zoro'} register={register} errors={errors} />
                                    <FormInputField title={'Batch'} type={'text'} label={'batch'} regex={/\d\d\d\d-\d\d/i} regexErrorMessage={"batch must be of the form 1999-24"} placeholder={'1999-24'} register={register} errors={errors} />
                                    <FormInputField title={'Company'} type={'text'} label={'company'} regex={/[A-Za-z0-9]+/i} regexErrorMessage={"company name must only be alphanumeric"} placeholder={'my great company'} register={register} errors={errors} />
                                    <FormInputField title={'Position'} type={'text'} label={'position'} regex={/[A-Za-z0-9]+/i} regexErrorMessage={"position must be only alphanumeric"} placeholder={'ceo of my great company'} register={register} errors={errors} />
                                    <FormInputField title={'Password'} type={'password'} label={'password'} regex={/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/i} regexErrorMessage={"Minimum 6 characters, 1 upper case English letter, 1 lower case English letter, 1 special character"} placeholder={'something secret'} register={register} errors={errors} />
                                    <FormInputField title={'Description'} type={'text'} label={'desc'} regex={/[A-Za-z0-9]+/i} regexErrorMessage={"dont write code in the description, you hacker"} placeholder={'a really cool description'} register={register} errors={errors} />
                                    <FormInputField title={'Image'} type={'image'} label={'image'} regex={""} regexErrorMessage={""} placeholder={''} register={register} errors={errors} />
                                    <FormInputField title={'Expertise'} type={'text'} label={'expertise'} regex={/[A-Za-z]+/i} regexErrorMessage={"enter some expertise"} placeholder={'ml, ai, bots'} register={register} errors={errors} />
                                    <Button text={"submit"} action={"submit"} type={"light"} size={"big"} onClick={() => handleSubmit(verifyEmail)} />
                                </div>
                                : <div>
                                    <FormInputField title={'Name'} type={'text'} label={'name'} regex={/[A-Za-z]+/i} regexErrorMessage={"name must be all text"} placeholder={'roronoa zoro'} register={register} errors={errors} />
                                    <FormInputField title={'Roll No'} type={'text'} label={'roll_no'} regex={/[A-Z]+\d\d\/\d\d\d/i} regexErrorMessage={"roll no must be of the format CSE21/017"} placeholder={'cse21/017'} register={register} errors={errors} />
                                    <FormInputField title={'Course'} type={'text'} label={'course'} regex={/[A-Z]+/i} regexErrorMessage={"form some"} placeholder={'sdsd'} register={register} errors={errors} />
                                    <FormInputField title={'Stream'} type={'text'} label={'stream'} regex={/[A-Z]+/i} regexErrorMessage={"form some"} placeholder={'cse'} register={register} errors={errors} />
                                    <FormInputField title={'Description'} type={'text'} label={'desc'} regex={/[A-Za-z0-9]+/i} regexErrorMessage={"dont write code in the description, you hacker"} placeholder={'a really cool description'} register={register} errors={errors} />
                                    <FormInputField title={'Password'} type={'password'} label={'password'} regex={/^\S*(?=\S{6,})(?=\S*\d)(?=\S*[A-Z])(?=\S*[a-z])(?=\S*[!@#$%^&*? ])\S*$/i} regexErrorMessage={"Minimum 6 characters, 1 upper case English letter, 1 lower case English letter, 1 special character"} placeholder={'something secret'} register={register} errors={errors} />
                                    <FormInputField title={'Image'} type={'image'} label={'image'} regex={""} regexErrorMessage={""} placeholder={''} register={register} errors={errors} />
                                    <Button text={"submit"} action={"submit"} type={"light"} size={"big"} onClick={() => handleSubmit(verifyEmail)} />
                                </div>
                            : <div>
                                <p style={{ margin: 0, color: "red", fontSize: "var(--font-size-sm)" }}>either email does not exist or you already have logged in</p>
                                <Button text={"verify"} onClick={handleSubmit(verifyEmail)} />
                                <Button text={"go back"} type={'light'} path={"/"} />
                            </div>
                }
            </form>
        </div>
    )
}