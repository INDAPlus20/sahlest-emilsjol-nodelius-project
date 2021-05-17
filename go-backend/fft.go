package main

import (
	"math"
	"math/cmplx"
)

func power_off(w complex128, i int) complex128 {
	pow := w
	for ; i > 1; i-- {
		pow = pow * w
	}

	return pow

}

func powerSpectrum(freq []complex128) []float64 {
	n := len(freq)

	PSD := make([]float64, n)
	for i := 0; i < n/2; i++ {
		PSD[i] = real(freq[i]*cmplx.Conj(freq[i])) / float64(n)
	}

	return PSD
}

func fft(array []float64) []complex128 {
	n := len(array)

	if n == 1 {
		return []complex128{complex(float64(array[0]), 0)}
	} else {

		a_odd := make([]float64, n/2)
		a_even := make([]float64, n/2)

		for i := 0; i < n/2; i++ {
			a_odd[i] = array[2*i+1]
			a_even[i] = array[2*i]
		}

		Y_even := fft(a_even)
		Y_odd := fft(a_odd)

		subData := make([]complex128, n)

		W := 1 + 0i
		for i := 0; i < n/2; i++ {
			p := Y_even[i]
			q := W * Y_odd[i]

			subData[i] = p + q
			subData[n/2+i] = p - q

			W = W * cmplx.Exp(complex(0, (-2.0*math.Pi)/float64(n)))
		}

		return subData
	}
}

// func main() {

// 	dt := 0.001
// 	array := make([]float64, int(1/dt))

// 	var freq float64 = 50

// 	for i := float64(0); i < 1; {
// 		array[int(i/dt)] = math.Sin(2 * math.Pi * freq * i)
// 		i = i + dt
// 	}

// 	output := fft(array)
// 	n := len(output)

// 	PSD := make([]float64, n/2)
// 	for i := 0; i < n/2; i++ {
// 		PSD[i] = real(output[i]*cmplx.Conj(output[i])) / float64(n)

// 		if PSD[i] > 1 {
// 			fmt.Printf("This is value %f at frequency %d\n", PSD[i], i+1)
// 		}
// 	}

// 	fmt.Println(PSD[int(freq)])
// }
