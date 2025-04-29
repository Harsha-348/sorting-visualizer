"use strict";
class Helper {
    constructor(time, list = []) {
        this.time = parseInt(400/time);
        this.list = list;
        // Calculate height scale based on container
        const values = Array.from(list).map(el => Number(el.getAttribute("value")));
        const maxValue = Math.max(...values);
        const containerHeight = list[0].parentElement.clientHeight - 50;
        this.heightScale = (containerHeight * 0.85) / maxValue;
    }

    mark = async (index) => {
        this.list[index].setAttribute("class", "cell current");
    }

    markSpl = async (index) => {
        this.list[index].setAttribute("class", "cell min");
    }

    unmark = async (index) => {
        this.list[index].setAttribute("class", "cell");
    }
    
    pause = async() => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, this.time);
        });
    }

    compare = async (index1, index2) => {
        await this.pause();
        let value1 = Number(this.list[index1].getAttribute("value"));
        let value2 = Number(this.list[index2].getAttribute("value"));
        if(value1 > value2) {
            return true;
        }
        return false;
    }

    swap = async (index1, index2) => {
        await this.pause();
        let value1 = this.list[index1].getAttribute("value");
        let value2 = this.list[index2].getAttribute("value");
        this.list[index1].setAttribute("value", value2);
        this.list[index1].style.height = `${Number(value2) * this.heightScale}px`;
        this.list[index2].setAttribute("value", value1);
        this.list[index2].style.height = `${Number(value1) * this.heightScale}px`;
    }
};