import React, { useEffect, useState, useRef } from 'react';
import './module.scss';
import Button from '../button/index';

interface Props {
    list: any;
    /**根据返回true、false来决定步骤是否变动 */
    onChange?: (arg0: BackData) => boolean;
    saveClick?: () => void
}
/**
 * 一步步
 * @param props 
 * @returns 
 */
const Temp = (props: Props) => {

    let [list, setList] = useState<any>(props.list);
    let [numSteps, setNumSteps] = useState<any>(list.length); //总步数
    let [currentStep, setCurrentStep] = useState<any>(1); //当前步数

    //点击上一步按钮
    const prevClick = () => {
        let data: BackData = {
            direction: "next",
            currentStep: currentStep,
            newStep: currentStep - 1
        }
        if (props.onChange) {
            let res = props.onChange(data);
            if (!res) {
                return;
            }
        }
        if (currentStep > 1) {
            currentStep--;
        }
        setCurrentStep(currentStep);
    }

    //点击下一步按钮
    const nextClick = () => {
        let data: BackData = {
            direction: "next",
            currentStep: currentStep,
            newStep: currentStep + 1
        }
        if (props.onChange) {
            let res = props.onChange(data);
            if (!res) {
                return;
            }
        }

        if (currentStep < numSteps) {
            currentStep++;
        }
        setCurrentStep(currentStep);
    }

    //点击保存按钮
    const saveClick = () => {
        props.saveClick && props.saveClick();
    }

    useEffect(() => {
    }, []);

    return (<div className="wizard-body">
        <div className="wizard-nav">
            <ul className="steps">
                {
                    list.map((o: any, i: any) => {
                        let cls = [];
                        if (i == currentStep - 1) {
                            cls.push('active');
                        }
                        return <li data-target={'#step_' + i} key={i} className={cls.join(' ')}><span className="step">{i + 1}</span>
                            {o.name}
                            <span className="chevron"></span>
                        </li>
                    })
                }
            </ul>
        </div>
        <div className="wizard-content">
            {
                list.map((o: any, i: any) => {

                    let cls = ['step-pane'];
                    if (i == currentStep - 1) {
                        cls.push('active');
                    }
                    return <div key={i} className={cls.join(' ')}>
                        {o.content}
                    </div>;
                })
            }
        </div>
        <div className="wizard-footer">
            <Button onClick={() => { prevClick() }} disabled={currentStep == 1}>上一步</Button>
            <Button onClick={() => { nextClick() }} disabled={currentStep == numSteps}>下一步</Button>
            <Button onClick={() => { saveClick() }} disabled={currentStep != numSteps}>保存</Button>
        </div>
    </div>);
}
interface BackData {
    direction: any;
    currentStep: any;
    newStep: any;
}

export default Temp;
