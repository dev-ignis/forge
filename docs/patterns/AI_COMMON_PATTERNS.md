# 🎨 Common UI Patterns with Forge

**Ready-to-use patterns for AI tools and rapid development**

This guide provides complete, production-ready patterns using Forge components. Perfect for AI-assisted development and quick prototyping.

## 🔐 Authentication Patterns

### Login Form (Basic)

```jsx
import { ForgeInput, ForgeButton, ForgeCard, ForgeAlert } from '@nexcraft/forge/integrations/react'
import { useState } from 'react'

function LoginForm() {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    try {
      const formData = new FormData(e.target)
      await login(formData.get('email'), formData.get('password'))
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ForgeCard className="w-full max-w-md">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Sign in to your account
          </h2>
          
          {error && (
            <ForgeAlert severity="error" className="mb-6">
              {error}
            </ForgeAlert>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <ForgeInput
              name="email"
              type="email"
              label="Email address"
              required
              autoComplete="email"
            />
            
            <ForgeInput
              name="password"
              type="password"
              label="Password"
              required
              autoComplete="current-password"
            />
            
            <div className="flex items-center justify-between">
              <ForgeCheckbox label="Remember me" />
              <a href="/forgot-password" className="text-sm text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
            
            <ForgeButton
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
            >
              Sign in
            </ForgeButton>
          </form>
          
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/register" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </a>
            </span>
          </div>
        </div>
      </ForgeCard>
    </div>
  )
}
```

### Registration Form (Advanced)

```jsx
import { 
  ForgeInput, 
  ForgeButton, 
  ForgeCard, 
  ForgeAlert, 
  ForgeCheckbox,
  ForgeSelect 
} from '@nexcraft/forge/integrations/react'
import { useForm } from 'react-hook-form'

function RegistrationForm() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const password = watch('password')

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await registerUser(data)
      setSuccess(true)
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <ForgeCard className="w-full max-w-md">
          <div className="p-8 text-center">
            <ForgeAlert severity="success" className="mb-6">
              Account created successfully! Check your email to verify your account.
            </ForgeAlert>
            <ForgeButton variant="primary" href="/login">
              Go to Login
            </ForgeButton>
          </div>
        </ForgeCard>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <ForgeCard className="w-full max-w-md">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Create your account
          </h2>
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <ForgeInput
                {...register('firstName', { required: 'First name is required' })}
                label="First name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
              />
              <ForgeInput
                {...register('lastName', { required: 'Last name is required' })}
                label="Last name"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
              />
            </div>
            
            <ForgeInput
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address'
                }
              })}
              type="email"
              label="Email address"
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            
            <ForgeSelect
              {...register('role', { required: 'Role is required' })}
              label="I am a..."
              options={[
                { value: 'developer', label: 'Developer' },
                { value: 'designer', label: 'Designer' },
                { value: 'manager', label: 'Product Manager' },
                { value: 'other', label: 'Other' }
              ]}
              error={!!errors.role}
              helperText={errors.role?.message}
            />
            
            <ForgeInput
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters'
                }
              })}
              type="password"
              label="Password"
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            
            <ForgeInput
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value => value === password || 'Passwords do not match'
              })}
              type="password"
              label="Confirm password"
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            
            <ForgeCheckbox
              {...register('terms', { required: 'You must accept the terms' })}
              label={
                <span>
                  I agree to the{' '}
                  <a href="/terms" className="text-blue-600 hover:text-blue-500">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-blue-600 hover:text-blue-500">
                    Privacy Policy
                  </a>
                </span>
              }
              error={!!errors.terms}
            />
            
            <ForgeButton
              type="submit"
              variant="primary"
              className="w-full"
              loading={loading}
            >
              Create account
            </ForgeButton>
          </form>
          
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                Sign in
              </a>
            </span>
          </div>
        </div>
      </ForgeCard>
    </div>
  )
}
```

## 📊 Dashboard Patterns

### Executive Dashboard

```jsx
import { 
  ForgeCard, 
  ForgeBadge, 
  ForgeProgress, 
  ForgeButton, 
  ForgeDataTable,
  ForgeSelect 
} from '@nexcraft/forge/integrations/react'

function ExecutiveDashboard({ data }) {
  const [timeRange, setTimeRange] = useState('7d')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Executive Dashboard</h1>
            <div className="flex items-center gap-4">
              <ForgeSelect
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                options={[
                  { value: '24h', label: 'Last 24 hours' },
                  { value: '7d', label: 'Last 7 days' },
                  { value: '30d', label: 'Last 30 days' },
                  { value: '90d', label: 'Last 90 days' }
                ]}
              />
              <ForgeButton variant="primary" icon="refresh">
                Refresh
              </ForgeButton>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <ForgeCard>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Total Revenue
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${data.revenue.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <ForgeBadge variant="success">+12.5%</ForgeBadge>
                <span className="text-sm text-gray-500 ml-2">vs last period</span>
              </div>
            </div>
          </ForgeCard>

          <ForgeCard>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Active Users
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {data.users.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <ForgeBadge variant="info">+8.2%</ForgeBadge>
                <span className="text-sm text-gray-500 ml-2">vs last period</span>
              </div>
            </div>
          </ForgeCard>

          <ForgeCard>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Conversion Rate
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {data.conversion}%
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <ForgeProgress value={data.conversion} max={100} className="mb-2" />
                <ForgeBadge variant="success">+2.1%</ForgeBadge>
                <span className="text-sm text-gray-500 ml-2">vs last period</span>
              </div>
            </div>
          </ForgeCard>

          <ForgeCard>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                    Customer Satisfaction
                  </p>
                  <p className="text-3xl font-bold text-gray-900">
                    {data.satisfaction}/5
                  </p>
                </div>
                <div className="p-3 bg-yellow-100 rounded-full">
                  <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
              <div className="mt-4">
                <ForgeBadge variant="warning">-0.3%</ForgeBadge>
                <span className="text-sm text-gray-500 ml-2">vs last period</span>
              </div>
            </div>
          </ForgeCard>
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity */}
          <ForgeCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Recent Activity
              </h3>
              <ForgeDataTable
                data={data.recentActivity}
                columns={[
                  { key: 'user', title: 'User' },
                  { key: 'action', title: 'Action' },
                  { key: 'time', title: 'Time' }
                ]}
                pagination={false}
                maxHeight="400px"
              />
            </div>
          </ForgeCard>

          {/* Top Products */}
          <ForgeCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Top Products
              </h3>
              <div className="space-y-4">
                {data.topProducts.map((product, index) => (
                  <div key={product.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="flex-shrink-0 w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{product.name}</p>
                        <p className="text-sm text-gray-500">{product.sales} sales</p>
                      </div>
                    </div>
                    <ForgeBadge variant="info">
                      ${product.revenue}
                    </ForgeBadge>
                  </div>
                ))}
              </div>
            </div>
          </ForgeCard>
        </div>
      </div>
    </div>
  )
}
```

## 📝 Form Patterns

### Contact Form

```jsx
import { 
  ForgeInput, 
  ForgeButton, 
  ForgeCard, 
  ForgeAlert, 
  ForgeSelect 
} from '@nexcraft/forge/integrations/react'

function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    
    try {
      await submitContactForm(Object.fromEntries(formData))
      setSubmitted(true)
    } catch (error) {
      console.error('Failed to submit form:', error)
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <ForgeCard className="max-w-2xl mx-auto">
        <div className="p-8 text-center">
          <ForgeAlert severity="success" className="mb-6">
            Thank you for your message! We'll get back to you within 24 hours.
          </ForgeAlert>
          <ForgeButton variant="secondary" onClick={() => setSubmitted(false)}>
            Send Another Message
          </ForgeButton>
        </div>
      </ForgeCard>
    )
  }

  return (
    <ForgeCard className="max-w-2xl mx-auto">
      <div className="p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h2>
        <p className="text-gray-600 mb-8">
          Have a question or want to work together? We'd love to hear from you.
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ForgeInput
              name="firstName"
              label="First name"
              required
            />
            <ForgeInput
              name="lastName"
              label="Last name"
              required
            />
          </div>
          
          <ForgeInput
            name="email"
            type="email"
            label="Email address"
            required
          />
          
          <ForgeInput
            name="company"
            label="Company (optional)"
          />
          
          <ForgeSelect
            name="subject"
            label="Subject"
            required
            options={[
              { value: 'general', label: 'General Inquiry' },
              { value: 'support', label: 'Technical Support' },
              { value: 'sales', label: 'Sales Question' },
              { value: 'partnership', label: 'Partnership Opportunity' },
              { value: 'other', label: 'Other' }
            ]}
            placeholder="Select a subject"
          />
          
          <ForgeInput
            name="message"
            type="textarea"
            label="Message"
            rows={6}
            required
            placeholder="Tell us more about your inquiry..."
          />
          
          <div className="flex justify-end">
            <ForgeButton
              type="submit"
              variant="primary"
              loading={loading}
              className="px-8"
            >
              Send Message
            </ForgeButton>
          </div>
        </form>
      </div>
    </ForgeCard>
  )
}
```

### Multi-Step Form

```jsx
import { 
  ForgeInput, 
  ForgeButton, 
  ForgeCard, 
  ForgeAlert, 
  ForgeSelect,
  ForgeProgress 
} from '@nexcraft/forge/integrations/react'

function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const validateStep = (step) => {
    const newErrors = {}
    
    switch (step) {
      case 1:
        if (!formData.firstName) newErrors.firstName = 'First name is required'
        if (!formData.lastName) newErrors.lastName = 'Last name is required'
        if (!formData.email) newErrors.email = 'Email is required'
        break
      case 2:
        if (!formData.company) newErrors.company = 'Company is required'
        if (!formData.role) newErrors.role = 'Role is required'
        break
      case 3:
        if (!formData.plan) newErrors.plan = 'Plan selection is required'
        break
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (validateStep(currentStep)) {
      try {
        await submitForm(formData)
        alert('Form submitted successfully!')
      } catch (error) {
        console.error('Submission error:', error)
      }
    }
  }

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }))
    }
  }

  return (
    <ForgeCard className="max-w-2xl mx-auto">
      <div className="p-8">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>Step {currentStep} of {totalSteps}</span>
            <span>{Math.round(progress)}% Complete</span>
          </div>
          <ForgeProgress value={progress} max={100} />
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ForgeInput
                  label="First name"
                  value={formData.firstName || ''}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                />
                <ForgeInput
                  label="Last name"
                  value={formData.lastName || ''}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                />
              </div>
              <ForgeInput
                type="email"
                label="Email address"
                value={formData.email || ''}
                onChange={(e) => updateFormData('email', e.target.value)}
                error={!!errors.email}
                helperText={errors.email}
              />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Company Details</h2>
            <div className="space-y-6">
              <ForgeInput
                label="Company name"
                value={formData.company || ''}
                onChange={(e) => updateFormData('company', e.target.value)}
                error={!!errors.company}
                helperText={errors.company}
              />
              <ForgeSelect
                label="Your role"
                value={formData.role || ''}
                onChange={(e) => updateFormData('role', e.target.value)}
                options={[
                  { value: 'ceo', label: 'CEO/Founder' },
                  { value: 'cto', label: 'CTO' },
                  { value: 'developer', label: 'Developer' },
                  { value: 'designer', label: 'Designer' },
                  { value: 'manager', label: 'Manager' },
                  { value: 'other', label: 'Other' }
                ]}
                error={!!errors.role}
                helperText={errors.role}
                placeholder="Select your role"
              />
              <ForgeSelect
                label="Company size"
                value={formData.companySize || ''}
                onChange={(e) => updateFormData('companySize', e.target.value)}
                options={[
                  { value: '1-10', label: '1-10 employees' },
                  { value: '11-50', label: '11-50 employees' },
                  { value: '51-200', label: '51-200 employees' },
                  { value: '201-1000', label: '201-1000 employees' },
                  { value: '1000+', label: '1000+ employees' }
                ]}
                placeholder="Select company size"
              />
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Plan</h2>
            <div className="space-y-4">
              {[
                { id: 'starter', name: 'Starter', price: '$29/month', features: ['Up to 5 users', 'Basic features', 'Email support'] },
                { id: 'professional', name: 'Professional', price: '$99/month', features: ['Up to 25 users', 'Advanced features', 'Priority support'] },
                { id: 'enterprise', name: 'Enterprise', price: 'Custom', features: ['Unlimited users', 'All features', 'Dedicated support'] }
              ].map((plan) => (
                <div
                  key={plan.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                    formData.plan === plan.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => updateFormData('plan', plan.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{plan.name}</h3>
                      <p className="text-gray-600 font-medium">{plan.price}</p>
                      <ul className="mt-2 space-y-1">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="text-sm text-gray-600">• {feature}</li>
                        ))}
                      </ul>
                    </div>
                    <input
                      type="radio"
                      name="plan"
                      value={plan.id}
                      checked={formData.plan === plan.id}
                      onChange={() => updateFormData('plan', plan.id)}
                      className="mt-1"
                    />
                  </div>
                </div>
              ))}
              {errors.plan && (
                <ForgeAlert severity="error">
                  {errors.plan}
                </ForgeAlert>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-8 border-t">
          <ForgeButton
            variant="secondary"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            Previous
          </ForgeButton>
          
          {currentStep < totalSteps ? (
            <ForgeButton variant="primary" onClick={handleNext}>
              Next
            </ForgeButton>
          ) : (
            <ForgeButton variant="primary" onClick={handleSubmit}>
              Complete Setup
            </ForgeButton>
          )}
        </div>
      </div>
    </ForgeCard>
  )
}
```

## 🛒 E-commerce Patterns

### Product Card Grid

```jsx
import { ForgeCard, ForgeButton, ForgeBadge } from '@nexcraft/forge/integrations/react'

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ForgeCard key={product.id} className="overflow-hidden">
          <div className="aspect-w-1 aspect-h-1">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
          </div>
          <div className="p-4">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 line-clamp-2">
                {product.name}
              </h3>
              {product.discount && (
                <ForgeBadge variant="error" size="sm">
                  -{product.discount}%
                </ForgeBadge>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {product.description}
            </p>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-gray-900">
                  ${product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">★</span>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews})
                </span>
              </div>
            </div>
            <ForgeButton 
              variant="primary" 
              className="w-full"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </ForgeButton>
          </div>
        </ForgeCard>
      ))}
    </div>
  )
}
```

---

## 🎯 Usage Tips for AI Tools

1. **Copy entire patterns** - These are production-ready components
2. **Customize styling** - Modify Tailwind classes or CSS custom properties  
3. **Add form validation** - Use React Hook Form integration when needed
4. **Handle loading states** - All buttons support `loading` prop
5. **Responsive design** - All patterns include responsive breakpoints
6. **Accessibility** - ARIA attributes and keyboard navigation included

## 📚 Related Documentation

- [Component Catalog](../AI_COMPONENT_CATALOG.md)
- [Import Guide](../guides/selective-imports.md)
- [Tailwind Plugin](../guides/tailwind-plugin.md)