import { Dispatch, MouseEventHandler, SetStateAction, useCallback, useEffect, useRef, useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import { setValue as setSpreadSheetMetaData } from '../../../lib/redux/spreadSheetMetaDataSlice'
import { RootState } from "@/app/lib/redux/store";
import { useDispatch, useSelector } from "react-redux";
import globals from "@/app/lib/globals/globals";

export default function SheetsBox({ index, onClick, sheetName, selectedSheet, setSelectedSheet }: { index: number, onClick: MouseEventHandler<HTMLDivElement>, sheetName: string, selectedSheet: number, setSelectedSheet: Dispatch<SetStateAction<number>> }) {
    const [dropdown, setDropDown] = useState<boolean>(false);
    const selected = selectedSheet === index;
    const spreadSheetMetaData = useSelector((state: RootState) => state.spreadSheetMetaData).value;
    const dispatch = useDispatch();
    const ref1 = useRef<HTMLDivElement>(null);
    const [name, setName] = useState<string>(sheetName);
    const [editing, setEditing] = useState<boolean>(false);

    const click = useCallback((e: MouseEvent) => {
        if (ref1.current && !ref1.current.contains(e.target as Node)) {
            setDropDown(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("click", click);

        return () => {
            document.removeEventListener("click", click);
        };
    }, [click]);

    return (
        <div ref={ref1} onClick={onClick} className={`relative ${selected ? 'bg-[#E1E9F7]' : 'bg-inherit'} flex align-middle ${selected ? '' : 'hover:bg-slate-200 hover:cursor-pointer'}`}>
            <div className={`bg-inherit hover:cursor-pointer outline-blue-600 mr-[8px] ml-[8px] inline-block h-[25px] mt-auto mb-auto ${selected ? 'text-[#2F59D0] font-bold' : ''}`} onDoubleClick={() => setEditing(true)}>
                {editing ? (
                    <input
                        className={`bg-inherit outline-blue-600 mr-[8px] ml-[8px] inline-block h-[25px] mt-auto mb-auto ${selected ? 'text-[#2F59D0] font-bold' : ''}`}
                        id={`sheet${index}`}
                        type="text"
                        value={name}
                        onChange={(e) => {
                            if (editing && selected) {
                                setName(e.currentTarget.value)
                                e.currentTarget.style.width = ((e.currentTarget.value.length + 1) * 8) + 'px'
                            }
                        }}
                        onBlur={() => setEditing(false)}
                    />
                ) : (
                    <span>{name}</span>
                )}
            </div>
            <GoTriangleDown onClick={() => {
                if (selected) {
                    setDropDown(true)
                }
            }} className={`mt-auto mb-auto mr-[8px] ${selected ? 'hover:bg-slate-300 hover:rounded-full hover:cursor-pointer w-[20px] h-[20px]' : ''}`} />
            {dropdown && <div className="absolute top-[-90px] left-0 shadow-md sh">
                <div className="flex gap-2 justify-start bg-white hover:bg-slate-100 hover:cursor-pointer w-[150px] h-[30px] pl-2" onClick={() => {
                    document.getElementById(`sheet${index}`)?.focus()
                    setDropDown(false)
                }}>
                    <span className="inline-block mt-auto mb-auto font-semibold">Rename</span>
                </div>
                <div className="flex gap-2 justify-start bg-white hover:bg-slate-100 hover:cursor-pointer w-[150px] h-[30px] pl-2">
                    <span className="inline-block mt-auto mb-auto font-semibold">Duplicate</span>
                </div>
                <div className="flex gap-2 justify-start bg-white hover:bg-slate-100 hover:cursor-pointer w-[150px] h-[30px] pl-2" onClick={(e) => {
                    setSelectedSheet(0)
                    globals.selectedSheet = 0
                    dispatch(setSpreadSheetMetaData({
                        ...spreadSheetMetaData,
                        SheetsData: spreadSheetMetaData.SheetsData.filter(x => x.SheetIndex !== index)
                    }))
                    setDropDown(false)
                }}>
                    <span className="inline-block mt-auto mb-auto font-semibold">Delete</span>
                </div>
            </div>}
        </div>
    );
}