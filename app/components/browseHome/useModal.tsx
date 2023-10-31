'use client'
import { MovieInterface } from "@/types";
import { useState } from "react";
import Modal from "./modal";

interface useModalProps {
    data: string
}

export default function UseModal({data}: useModalProps ){
    return(<p className="bg-white text-9xl text-red-500">{data}</p>)
}