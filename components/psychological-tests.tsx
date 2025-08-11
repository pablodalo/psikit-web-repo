"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowLeft, ArrowRight, FileText, BarChart3 } from "lucide-react"

interface TestQuestion {
  id: string
  question: string
  options: { value: string; label: string; score: number }[]
}

interface TestResult {
  score: number
  interpretation: string
  severity: "minimal" | "mild" | "moderate" | "severe"
  recommendations: string[]
}

interface PsychologicalTestProps {
  testType: "PHQ9" | "GAD7" | "ROSENBERG" | "AUDIT" | "MMSE" | "MOCA"
  patientId: string
  onComplete: (result: TestResult) => void
  onCancel: () => void
}

export function PsychologicalTest({ testType, patientId, onComplete, onCancel }: PsychologicalTestProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [isCompleted, setIsCompleted] = useState(false)
  const [result, setResult] = useState<TestResult | null>(null)

  // Definir preguntas según el tipo de test
  const getTestData = () => {
    switch (testType) {
      case "PHQ9":
        return {
          title: "PHQ-9 - Cuestionario de Salud del Paciente",
          description: "Evaluación de síntomas depresivos en las últimas 2 semanas",
          questions: [
            {
              id: "1",
              question: "Poco interés o placer en hacer cosas",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "2",
              question: "Se ha sentido decaído, deprimido o sin esperanza",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "3",
              question: "Dificultad para quedarse o permanecer dormido, o dormir demasiado",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "4",
              question: "Se ha sentido cansado o con poca energía",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "5",
              question: "Falta de apetito o comer en exceso",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "6",
              question:
                "Se ha sentido mal consigo mismo - o que es un fracaso o que ha quedado mal con usted mismo o con su familia",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "7",
              question: "Dificultad para concentrarse en cosas como leer el periódico o ver televisión",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "8",
              question:
                "¿Se ha movido o hablado tan lento que otras personas podrían haberlo notado? O lo contrario - muy inquieto o agitado que ha estado moviéndose mucho más de lo normal",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "9",
              question: "Pensamientos de que estaría mejor muerto o de lastimarse de alguna manera",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
          ],
        }

      case "GAD7":
        return {
          title: "GAD-7 - Escala de Ansiedad Generalizada",
          description: "Evaluación de síntomas de ansiedad en las últimas 2 semanas",
          questions: [
            {
              id: "1",
              question: "Sentirse nervioso, ansioso o muy alterado",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "2",
              question: "No ser capaz de parar o controlar las preocupaciones",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "3",
              question: "Preocuparse demasiado por diferentes cosas",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "4",
              question: "Dificultad para relajarse",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "5",
              question: "Estar tan inquieto que es difícil permanecer sentado",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "6",
              question: "Irritarse o enojarse fácilmente",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
            {
              id: "7",
              question: "Sentir miedo como si algo terrible fuera a pasar",
              options: [
                { value: "0", label: "Para nada", score: 0 },
                { value: "1", label: "Varios días", score: 1 },
                { value: "2", label: "Más de la mitad de los días", score: 2 },
                { value: "3", label: "Casi todos los días", score: 3 },
              ],
            },
          ],
        }

      default:
        return {
          title: "Test Psicológico",
          description: "Evaluación psicológica",
          questions: [],
        }
    }
  }

  const testData = getTestData()

  const calculateResult = (): TestResult => {
    const totalScore = Object.values(answers).reduce((sum, answer) => {
      const question = testData.questions.find((q) => answers[q.id] === answer)
      const option = question?.options.find((opt) => opt.value === answer)
      return sum + (option?.score || 0)
    }, 0)

    let interpretation = ""
    let severity: TestResult["severity"] = "minimal"
    let recommendations: string[] = []

    if (testType === "PHQ9") {
      if (totalScore <= 4) {
        severity = "minimal"
        interpretation = "Síntomas depresivos mínimos"
        recommendations = [
          "Mantener hábitos saludables",
          "Continuar con actividades placenteras",
          "Monitoreo regular del estado de ánimo",
        ]
      } else if (totalScore <= 9) {
        severity = "mild"
        interpretation = "Síntomas depresivos leves"
        recommendations = [
          "Considerar técnicas de autoayuda",
          "Aumentar actividad física",
          "Mejorar higiene del sueño",
          "Seguimiento en 2-4 semanas",
        ]
      } else if (totalScore <= 14) {
        severity = "moderate"
        interpretation = "Síntomas depresivos moderados"
        recommendations = [
          "Considerar psicoterapia",
          "Evaluación médica recomendada",
          "Técnicas de manejo del estrés",
          "Seguimiento semanal",
        ]
      } else {
        severity = "severe"
        interpretation = "Síntomas depresivos severos"
        recommendations = [
          "Tratamiento psicológico inmediato",
          "Evaluación psiquiátrica urgente",
          "Considerar medicación",
          "Evaluación de riesgo suicida",
          "Seguimiento intensivo",
        ]
      }
    } else if (testType === "GAD7") {
      if (totalScore <= 4) {
        severity = "minimal"
        interpretation = "Ansiedad mínima"
        recommendations = ["Técnicas de relajación preventivas", "Mantener rutina de ejercicio", "Monitoreo ocasional"]
      } else if (totalScore <= 9) {
        severity = "mild"
        interpretation = "Ansiedad leve"
        recommendations = [
          "Técnicas de respiración",
          "Mindfulness y meditación",
          "Reducir cafeína",
          "Seguimiento en 2-4 semanas",
        ]
      } else if (totalScore <= 14) {
        severity = "moderate"
        interpretation = "Ansiedad moderada"
        recommendations = [
          "Terapia cognitivo-conductual",
          "Técnicas de manejo de ansiedad",
          "Evaluación médica",
          "Seguimiento semanal",
        ]
      } else {
        severity = "severe"
        interpretation = "Ansiedad severa"
        recommendations = [
          "Tratamiento psicológico inmediato",
          "Evaluación psiquiátrica",
          "Considerar medicación ansiolítica",
          "Seguimiento intensivo",
        ]
      }
    }

    return {
      score: totalScore,
      interpretation,
      severity,
      recommendations,
    }
  }

  const handleAnswer = (questionId: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }))
  }

  const nextQuestion = () => {
    if (currentQuestion < testData.questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      // Completar test
      const testResult = calculateResult()
      setResult(testResult)
      setIsCompleted(true)
      onComplete(testResult)
    }
  }

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const progress = ((currentQuestion + 1) / testData.questions.length) * 100

  if (isCompleted && result) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <CardTitle>Test Completado</CardTitle>
          <CardDescription>{testData.title}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Puntuación */}
          <div className="text-center p-6 bg-gray-50 rounded-lg">
            <div className="text-4xl font-bold mb-2">{result.score}</div>
            <div className="text-lg text-gray-600">Puntuación Total</div>
            <Badge
              className={`mt-2 ${
                result.severity === "minimal"
                  ? "bg-green-600"
                  : result.severity === "mild"
                    ? "bg-yellow-600"
                    : result.severity === "moderate"
                      ? "bg-orange-600"
                      : "bg-red-600"
              }`}
            >
              {result.interpretation}
            </Badge>
          </div>

          {/* Interpretación */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-2 flex items-center">
              <BarChart3 className="h-4 w-4 mr-2" />
              Interpretación
            </h4>
            <p className="text-gray-700">{result.interpretation}</p>
          </div>

          {/* Recomendaciones */}
          <div className="p-4 border rounded-lg">
            <h4 className="font-medium mb-3">Recomendaciones</h4>
            <div className="space-y-2">
              {result.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-700">{rec}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Información importante */}
          {result.severity === "severe" && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-2 text-red-800 mb-2">
                <FileText className="h-4 w-4" />
                <span className="font-medium">Atención Requerida</span>
              </div>
              <p className="text-sm text-red-700">
                Los resultados indican síntomas severos que requieren atención profesional inmediata. Se recomienda
                contactar con su psicólogo o buscar ayuda especializada.
              </p>
            </div>
          )}

          <div className="flex space-x-2">
            <Button onClick={() => window.print()} variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Imprimir Resultados
            </Button>
            <Button onClick={onCancel} className="flex-1">
              Finalizar
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentQ = testData.questions[currentQuestion]

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between mb-4">
          <div>
            <CardTitle>{testData.title}</CardTitle>
            <CardDescription>{testData.description}</CardDescription>
          </div>
          <Badge variant="outline">
            {currentQuestion + 1} / {testData.questions.length}
          </Badge>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Pregunta actual */}
        <div className="p-6 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium mb-4">
            {currentQuestion + 1}. {currentQ.question}
          </h3>

          <RadioGroup value={answers[currentQ.id] || ""} onValueChange={(value) => handleAnswer(currentQ.id, value)}>
            {currentQ.options.map((option) => (
              <div
                key={option.value}
                className="flex items-center space-x-2 p-3 rounded-lg hover:bg-white transition-colors"
              >
                <RadioGroupItem value={option.value} id={option.value} />
                <Label htmlFor={option.value} className="flex-1 cursor-pointer">
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Navegación */}
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevQuestion} disabled={currentQuestion === 0}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Anterior
          </Button>

          <Button onClick={onCancel} variant="ghost">
            Cancelar Test
          </Button>

          <Button onClick={nextQuestion} disabled={!answers[currentQ.id]}>
            {currentQuestion === testData.questions.length - 1 ? "Finalizar" : "Siguiente"}
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>

        {/* Indicadores de progreso */}
        <div className="flex justify-center space-x-2">
          {testData.questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index < currentQuestion ? "bg-green-600" : index === currentQuestion ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
