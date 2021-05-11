package main

import (
	"fmt"
	"math"
	"math/cmplx"
)

func power_off(w complex128, i int) complex128 {
	var pow complex128
	for ; i > 0; i-- {
		pow = pow * w
	}

	return pow

}

func fft(array []complex128, w complex128) []complex128 {
	var n = len(array)

	if n == 1 {
		return array
	} else {
		a_odd := []complex128{}
		a_even := []complex128{}

		for i := 0; i < n/2; i++ {
			a_odd[i] = array[2*i+1]
			a_even[i] = array[2*i]
		}

		w_2 := w * w

		even := fft(a_even, w_2)
		odd := fft(a_odd, w_2)

		subData := []complex128{}
		for i := 0; i < n/2; i++ {
			subData[i] = even[i] + power_off(w, i)*odd[i]
			subData[n/2+i] = even[i] - power_off(w, i)*odd[i]
		}

		return subData
	}
}

func main() {

	array := []int{2, 3, 5, 7, 11, 13}
	n := len(array)

	c_array := []complex128{}
	for i := 0; i < n; i++ {
		c_array[i] = complex128(float64(array[i]), 0)
	}

	w := cmplx.Exp(complex(0, -2.0*math.Pi/float64(n)))

	output := fft(c_array, w)

	fmt.Println(output)
}
