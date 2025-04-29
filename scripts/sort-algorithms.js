class sortAlgorithms {
    constructor(speed) {
        this.list = document.querySelectorAll(".cell");
        this.speed = speed;
        this.helper = new Helper(speed, this.list);
    }

    // Bubble Sort
    async BubbleSort() {
        updateDescription("bubble");
        for (let i = 0; i < this.list.length - 1; ++i) {
            for (let j = 0; j < this.list.length - i - 1; ++j) {
                await this.helper.mark(j);
                await this.helper.mark(j + 1);
                if (await this.helper.compare(j, j + 1)) {
                    await this.helper.swap(j, j + 1);
                }
                await this.helper.unmark(j);
                await this.helper.unmark(j + 1);
            }
            this.list[this.list.length - i - 1].setAttribute("class", "cell done");
        }
        this.list[0].setAttribute("class", "cell done");
    }

    // Selection Sort
    async SelectionSort() {
        updateDescription("selection");
        for (let i = 0; i < this.list.length - 1; ++i) {
            let minIndex = i;
            await this.helper.markSpl(i);
            
            for (let j = i + 1; j < this.list.length; ++j) {
                await this.helper.mark(j);
                if (await this.helper.compare(minIndex, j)) {
                    await this.helper.unmark(minIndex);
                    minIndex = j;
                    await this.helper.markSpl(minIndex);
                }
                else await this.helper.unmark(j);
            }
            
            await this.helper.swap(i, minIndex);
            this.list[i].setAttribute("class", "cell done");
        }
        this.list[this.list.length - 1].setAttribute("class", "cell done");
    }

    // Insertion Sort
    async InsertionSort() {
        updateDescription("insertion");
        this.list[0].setAttribute("class", "cell done");
        
        for (let i = 1; i < this.list.length; ++i) {
            let j = i;
            await this.helper.mark(j);
            while (j > 0 && await this.helper.compare(j - 1, j)) {
                await this.helper.swap(j - 1, j);
                await this.helper.unmark(j);
                --j;
                await this.helper.mark(j);
            }
            await this.helper.unmark(j);
            for (let k = 0; k <= i; ++k) {
                this.list[k].setAttribute("class", "cell done");
            }
        }
    }

    // Merge Sort
    async MergeSort() {
        updateDescription("merge");
        await this.MergeDivider(0, this.list.length - 1);
        for (let counter = 0; counter < this.list.length; ++counter) {
            this.list[counter].setAttribute("class", "cell done");
        }
    }

    async MergeDivider(start, end) {
        if (start < end) {
            let mid = Math.floor((start + end) / 2);
            await this.MergeDivider(start, mid);
            await this.MergeDivider(mid + 1, end);
            await this.Merge(start, mid, end);
        }
    }

    async Merge(start, mid, end) {
        let newList = new Array();
        let frontCounter = start;
        let midCounter = mid + 1;
        
        while (frontCounter <= mid && midCounter <= end) {
            await this.helper.mark(frontCounter);
            await this.helper.mark(midCounter);
            if (await this.helper.compare(frontCounter, midCounter)) {
                newList.push(Number(this.list[midCounter].getAttribute("value")));
                ++midCounter;
            }
            else {
                newList.push(Number(this.list[frontCounter].getAttribute("value")));
                ++frontCounter;
            }
        }
        while (frontCounter <= mid) {
            newList.push(Number(this.list[frontCounter].getAttribute("value")));
            ++frontCounter;
        }
        while (midCounter <= end) {
            newList.push(Number(this.list[midCounter].getAttribute("value")));
            ++midCounter;
        }

        for (let c = start; c <= end; ++c) {
            await this.helper.mark(c);
            this.list[c].setAttribute("value", newList[c - start]);
            this.list[c].style.height = `${3.8*newList[c - start]}px`;
            await this.helper.unmark(c);
        }
    }

    // Quick Sort
    async QuickSort() {
        updateDescription("quick");
        await this.QuickDivider(0, this.list.length - 1);
        for (let c = 0; c < this.list.length; ++c) {
            this.list[c].setAttribute("class", "cell done");
        }
    }

    async QuickDivider(start, end) {
        if (start < end) {
            let pivot = await this.Partition(start, end);
            await this.QuickDivider(start, pivot - 1);
            await this.QuickDivider(pivot + 1, end);
        }
    }

    async Partition(start, end) {
        let pivot = this.list[end].getAttribute("value");
        let prev_index = start - 1;

        await this.helper.markSpl(end);
        for (let c = start; c < end; ++c) {
            let currValue = Number(this.list[c].getAttribute("value"));
            await this.helper.mark(c);
            if (currValue < pivot) {
                ++prev_index;
                await this.helper.swap(prev_index, c);
            }
            await this.helper.unmark(c);
        }
        await this.helper.swap(prev_index + 1, end);
        await this.helper.unmark(end);
        return prev_index + 1;
    }

    // Heap Sort
    async HeapSort() {
        updateDescription("heap");
        let n = this.list.length;

        // Build max heap
        for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
            await this.heapify(n, i);
        }

        // Extract elements from heap one by one
        for (let i = n - 1; i > 0; i--) {
            await this.helper.swap(0, i);
            this.list[i].setAttribute("class", "cell done");
            await this.heapify(i, 0);
        }
        this.list[0].setAttribute("class", "cell done");
    }

    async heapify(n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;

        await this.helper.mark(largest);
        if (left < n) await this.helper.mark(left);
        if (right < n) await this.helper.mark(right);

        if (left < n && await this.helper.compare(largest, left)) {
            largest = left;
        }

        if (right < n && await this.helper.compare(largest, right)) {
            largest = right;
        }

        if (largest !== i) {
            await this.helper.swap(i, largest);
            await this.helper.unmark(i);
            if (left < n) await this.helper.unmark(left);
            if (right < n) await this.helper.unmark(right);
            await this.heapify(n, largest);
        } else {
            await this.helper.unmark(i);
            if (left < n) await this.helper.unmark(left);
            if (right < n) await this.helper.unmark(right);
        }
    }

    // Shell Sort
    async ShellSort() {
        updateDescription("shell");
        let n = this.list.length;

        // Start with a big gap, then reduce the gap
        for (let gap = Math.floor(n/2); gap > 0; gap = Math.floor(gap/2)) {
            // Do a gapped insertion sort
            for (let i = gap; i < n; i++) {
                await this.helper.mark(i);
                let temp = Number(this.list[i].getAttribute("value"));
                let j;

                for (j = i; j >= gap && Number(this.list[j-gap].getAttribute("value")) > temp; j -= gap) {
                    await this.helper.mark(j-gap);
                    await this.helper.swap(j, j-gap);
                    await this.helper.unmark(j-gap);
                }
                await this.helper.unmark(i);
            }
        }

        // Mark all as done
        for (let i = 0; i < n; i++) {
            this.list[i].setAttribute("class", "cell done");
        }
    }
}

// Algorithm descriptions and complexities
const algorithmInfo = {
    bubble: {
      description: "Bubble Sort is a simple comparison-based sorting algorithm. It works by repeatedly swapping adjacent elements if they are in the wrong order. With each pass, the largest unsorted element 'bubbles' to the end of the array. The process is repeated until the array is sorted. It is best suited for educational purposes but is inefficient for large datasets due to its quadratic time complexity.",
      complexity: {
        time: "Best: O(n), Average: O(n²), Worst: O(n²)",
        space: "O(1)"
      }
    },
    selection: {
      description: "Selection Sort is an in-place comparison-based algorithm. It divides the array into sorted and unsorted parts. It repeatedly selects the smallest (or largest) element from the unsorted section and moves it to the end of the sorted section. It performs the same number of comparisons regardless of the input's initial order and is not adaptive. It's easy to understand but inefficient on large arrays.",
      complexity: {
        time: "Best: O(n²), Average: O(n²), Worst: O(n²)",
        space: "O(1)"
      }
    },
    insertion: {
      description: "Insertion Sort builds the sorted array one element at a time by taking an element from the unsorted part and inserting it at the correct position in the sorted part. It's efficient for small or nearly sorted datasets and performs fewer comparisons than Bubble or Selection Sort in such cases. It's also stable and in-place.",
      complexity: {
        time: "Best: O(n), Average: O(n²), Worst: O(n²)",
        space: "O(1)"
      }
    },
    merge: {
      description: "Merge Sort is a stable, divide-and-conquer algorithm that divides the array into halves recursively, sorts each half, and then merges the sorted halves into a final sorted array. It has consistent performance across all input types and is preferred when stability and guaranteed performance are needed. However, it requires extra space for merging.",
      complexity: {
        time: "Best: O(n log n), Average: O(n log n), Worst: O(n log n)",
        space: "O(n)"
      }
    },
    quick: {
      description: "Quick Sort is a fast, in-place, divide-and-conquer algorithm. It works by selecting a 'pivot' element and partitioning the array into elements less than and greater than the pivot, then recursively sorting the subarrays. It's highly efficient in practice but can degrade to O(n²) on already sorted or poorly chosen pivots. Using random or median pivots helps mitigate worst-case performance. Not stable.",
      complexity: {
        time: "Best: O(n log n), Average: O(n log n), Worst: O(n²)",
        space: "O(log n)"
      }
    },
    heap: {
      description: "Heap Sort is a comparison-based algorithm that uses a binary heap data structure (usually a max-heap). It first builds a heap from the array, then repeatedly extracts the maximum element and places it at the end. It is not stable but performs well and guarantees O(n log n) time in all cases. It's used in real-time systems where worst-case time bounds are critical.",
      complexity: {
        time: "Best: O(n log n), Average: O(n log n), Worst: O(n log n)",
        space: "O(1)"
      }
    },
    shell: {
      description: "Shell Sort is an optimization of Insertion Sort that allows the exchange of far-apart elements to move values closer to their final position faster. It uses a gap sequence to compare elements at a distance and gradually reduces the gap. While not stable, it's significantly faster than basic sorts and has practical value, especially for medium-sized arrays.",
      complexity: {
        time: "Best: O(n log n), Average: O(n^1.25), Worst: O(n²)",
        space: "O(1)"
      }
    }
};

// Function to update description and complexity
function updateDescription(algorithm) {
    const info = algorithmInfo[algorithm];
    if (info) {
        document.getElementById("sort-description").textContent = info.description;
        
        // Format complexity information
        const complexityText = `Time Complexity:\n${info.complexity.time}\n\nSpace Complexity:\n${info.complexity.space}`;
        document.getElementById("sort-complexity").textContent = complexityText;
        
        // Add white-space: pre-line to preserve line breaks
        document.getElementById("sort-complexity").style.whiteSpace = "pre-line";
    }
}