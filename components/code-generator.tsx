"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Code,
  Download,
  Copy,
  Play,
  Settings,
  FileText,
  Database,
  Globe,
  Monitor,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

export function CodeGenerator() {
  const [selectedLanguage, setSelectedLanguage] = useState("javascript")
  const [selectedFramework, setSelectedFramework] = useState("nextjs")
  const [includeAuth, setIncludeAuth] = useState(true)
  const [includeErrorHandling, setIncludeErrorHandling] = useState(true)

  const codeExamples = {
    javascript: {
      nextjs: `// Next.js API Route - /api/integrations/post-created.js
import { NextResponse } from 'next/server'
import { verifyWebhookSignature } from '@/lib/webhook-utils'
import { sendNotification } from '@/lib/notifications'
import { updateAnalytics } from '@/lib/analytics'

export async function POST(request) {
  try {
    // Verify webhook signature
    const signature = request.headers.get('x-webhook-signature')
    const body = await request.text()
    
    if (!verifyWebhookSignature(body, signature)) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const data = JSON.parse(body)
    
    // Check user tier condition
    if (data.user.tier === 'elite') {
      // Send notification to elite followers
      await sendNotification({
        type: 'elite_post',
        userId: data.user.id,
        postId: data.post.id,
        message: \`New post from Elite member: \${data.user.name}\`
      })
    } else {
      // Update analytics for regular users
      await updateAnalytics({
        event: 'post_created',
        userId: data.user.id,
        metadata: {
          postType: data.post.type,
          followerCount: data.user.followerCount
        }
      })
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Integration executed successfully' 
    })
    
  } catch (error) {
    console.error('Integration error:', error)
    return NextResponse.json({ 
      error: 'Integration failed' 
    }, { status: 500 })
  }
}`,
      react: `// React Component for Integration Management
import React, { useState, useEffect } from 'react'
import { useIntegration } from '@/hooks/useIntegration'

export function IntegrationManager() {
  const [integrations, setIntegrations] = useState([])
  const { executeIntegration, isLoading } = useIntegration()

  useEffect(() => {
    fetchIntegrations()
  }, [])

  const fetchIntegrations = async () => {
    try {
      const response = await fetch('/api/integrations')
      const data = await response.json()
      setIntegrations(data.integrations)
    } catch (error) {
      console.error('Failed to fetch integrations:', error)
    }
  }

  const handleExecuteIntegration = async (integrationId, payload) => {
    try {
      const result = await executeIntegration(integrationId, payload)
      
      if (result.success) {
        // Handle success
        console.log('Integration executed successfully:', result)
      } else {
        // Handle error
        console.error('Integration failed:', result.error)
      }
    } catch (error) {
      console.error('Execution error:', error)
    }
  }

  return (
    <div className="integration-manager">
      <h2>Active Integrations</h2>
      {integrations.map(integration => (
        <div key={integration.id} className="integration-card">
          <h3>{integration.name}</h3>
          <p>{integration.description}</p>
          <button 
            onClick={() => handleExecuteIntegration(integration.id, {})}
            disabled={isLoading}
          >
            {isLoading ? 'Executing...' : 'Execute'}
          </button>
        </div>
      ))}
    </div>
  )
}`,
    },
    python: {
      fastapi: `# FastAPI Integration Handler
from fastapi import FastAPI, HTTPException, Header, Request
from pydantic import BaseModel
import hmac
import hashlib
import json
from typing import Optional

app = FastAPI()

class WebhookPayload(BaseModel):
    event: str
    user: dict
    post: dict
    timestamp: str

class IntegrationResponse(BaseModel):
    success: bool
    message: str
    execution_id: Optional[str] = None

def verify_webhook_signature(payload: str, signature: str, secret: str) -> bool:
    """Verify webhook signature for security"""
    expected_signature = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f"sha256={expected_signature}", signature)

@app.post("/webhook/post-created", response_model=IntegrationResponse)
async def handle_post_created(
    payload: WebhookPayload,
    request: Request,
    x_webhook_signature: str = Header(None)
):
    try:
        # Verify webhook signature
        body = await request.body()
        if not verify_webhook_signature(body.decode(), x_webhook_signature, "your-secret"):
            raise HTTPException(status_code=401, detail="Invalid signature")
        
        # Process based on user tier
        if payload.user.get("tier") == "elite":
            # Send elite notification
            result = await send_elite_notification(payload.user, payload.post)
        else:
            # Update analytics
            result = await update_user_analytics(payload.user, payload.post)
        
        return IntegrationResponse(
            success=True,
            message="Integration executed successfully",
            execution_id=result.get("execution_id")
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Integration failed: {str(e)}")

async def send_elite_notification(user: dict, post: dict):
    """Send notification for elite user posts"""
    # Implementation for elite notifications
    return {"execution_id": "exec_123", "notifications_sent": 1247}

async def update_user_analytics(user: dict, post: dict):
    """Update analytics for regular user posts"""
    # Implementation for analytics update
    return {"execution_id": "exec_124", "analytics_updated": True}`,
      django: `# Django Integration Views
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods
from django.utils.decorators import method_decorator
import json
import hmac
import hashlib

@csrf_exempt
@require_http_methods(["POST"])
def post_created_webhook(request):
    """Handle post created webhook in Django"""
    try:
        # Verify webhook signature
        signature = request.headers.get('X-Webhook-Signature')
        body = request.body.decode('utf-8')
        
        if not verify_signature(body, signature):
            return JsonResponse({'error': 'Invalid signature'}, status=401)
        
        data = json.loads(body)
        
        # Process based on user tier
        if data['user']['tier'] == 'elite':
            # Send elite notification
            result = send_elite_notification(data['user'], data['post'])
        else:
            # Update analytics
            result = update_analytics(data['user'], data['post'])
        
        return JsonResponse({
            'success': True,
            'message': 'Integration executed successfully',
            'execution_id': result.get('execution_id')
        })
        
    except Exception as e:
        return JsonResponse({
            'error': f'Integration failed: {str(e)}'
        }, status=500)

def verify_signature(payload, signature):
    """Verify webhook signature"""
    secret = 'your-webhook-secret'
    expected = hmac.new(
        secret.encode('utf-8'),
        payload.encode('utf-8'),
        hashlib.sha256
    ).hexdigest()
    return hmac.compare_digest(f'sha256={expected}', signature)`,
    },
    curl: `# cURL Examples for Testing Integration

# Test webhook endpoint
curl -X POST https://api.projectaccess.co/webhook/post-created \\
  -H "Content-Type: application/json" \\
  -H "X-Webhook-Signature: sha256=your-signature" \\
  -d '{
    "event": "post.created",
    "user": {
      "id": "user_123",
      "name": "John Doe",
      "tier": "elite",
      "followerCount": 1247
    },
    "post": {
      "id": "post_456",
      "type": "text",
      "content": "Hello from Project Access!",
      "timestamp": "2024-01-15T14:30:25Z"
    }
  }'

# Test integration execution
curl -X POST https://api.projectaccess.co/integrations/execute \\
  -H "Authorization: Bearer your-api-key" \\
  -H "Content-Type: application/json" \\
  -d '{
    "integration_id": "integration_123",
    "payload": {
      "trigger": "manual",
      "data": {}
    }
  }'

# Get integration status
curl -X GET https://api.projectaccess.co/integrations/integration_123/status \\
  -H "Authorization: Bearer your-api-key"

# List all integrations
curl -X GET https://api.projectaccess.co/integrations \\
  -H "Authorization: Bearer your-api-key"`,
  }

  const sdkExamples = {
    javascript: `// Project Access JavaScript SDK
import { ProjectAccessSDK } from '@project-access/sdk'

const sdk = new ProjectAccessSDK({
  apiKey: 'your-api-key',
  environment: 'production' // or 'sandbox'
})

// Execute integration
const result = await sdk.integrations.execute('integration_123', {
  trigger: 'manual',
  data: {
    userId: 'user_123',
    action: 'send_notification'
  }
})

// Listen for webhook events
sdk.webhooks.on('post.created', async (event) => {
  console.log('New post created:', event.data)
  
  // Execute integration based on event
  if (event.data.user.tier === 'elite') {
    await sdk.integrations.execute('elite_notification', event.data)
  }
})

// Create new integration
const integration = await sdk.integrations.create({
  name: 'Custom Post Handler',
  trigger: {
    type: 'webhook',
    event: 'post.created'
  },
  actions: [
    {
      type: 'notification',
      config: {
        template: 'elite_post_notification'
      }
    }
  ]
})`,
    python: `# Project Access Python SDK
from project_access import ProjectAccessSDK

sdk = ProjectAccessSDK(
    api_key='your-api-key',
    environment='production'
)

# Execute integration
result = sdk.integrations.execute('integration_123', {
    'trigger': 'manual',
    'data': {
        'user_id': 'user_123',
        'action': 'send_notification'
    }
})

# Create webhook handler
@sdk.webhook_handler('post.created')
def handle_post_created(event):
    print(f"New post created: {event.data}")
    
    # Execute integration based on event
    if event.data['user']['tier'] == 'elite':
        sdk.integrations.execute('elite_notification', event.data)

# Create new integration
integration = sdk.integrations.create({
    'name': 'Custom Post Handler',
    'trigger': {
        'type': 'webhook',
        'event': 'post.created'
    },
    'actions': [
        {
            'type': 'notification',
            'config': {
                'template': 'elite_post_notification'
            }
        }
    ]
})`,
  }

  const deploymentConfigs = {
    vercel: `// vercel.json
{
  "functions": {
    "api/integrations/[...slug].js": {
      "maxDuration": 30
    }
  },
  "env": {
    "WEBHOOK_SECRET": "@webhook-secret",
    "PROJECT_ACCESS_API_KEY": "@project-access-api-key"
  },
  "headers": [
    {
      "source": "/api/integrations/(.*)",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Access-Control-Allow-Methods",
          "value": "GET, POST, PUT, DELETE, OPTIONS"
        }
      ]
    }
  ]
}`,
    docker: `# Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]

# docker-compose.yml
version: '3.8'
services:
  integration-service:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - WEBHOOK_SECRET=your-secret
      - PROJECT_ACCESS_API_KEY=your-api-key
    depends_on:
      - redis
      - postgres
  
  redis:
    image: redis:alpine
    ports:
      - "6379:6379"
  
  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: integrations
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"`,
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Code Generation Options */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Code Generation Options
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-2 block">Language</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="curl">cURL</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-2 block">Framework</label>
              <select
                value={selectedFramework}
                onChange={(e) => setSelectedFramework(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
              >
                {selectedLanguage === "javascript" && (
                  <>
                    <option value="nextjs">Next.js</option>
                    <option value="react">React</option>
                  </>
                )}
                {selectedLanguage === "python" && (
                  <>
                    <option value="fastapi">FastAPI</option>
                    <option value="django">Django</option>
                  </>
                )}
                {selectedLanguage === "curl" && <option value="curl">cURL</option>}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-400 block">Options</label>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-sm text-white">
                  <input
                    type="checkbox"
                    checked={includeAuth}
                    onChange={(e) => setIncludeAuth(e.target.checked)}
                    className="rounded"
                  />
                  Include Authentication
                </label>
                <label className="flex items-center gap-2 text-sm text-white">
                  <input
                    type="checkbox"
                    checked={includeErrorHandling}
                    onChange={(e) => setIncludeErrorHandling(e.target.checked)}
                    className="rounded"
                  />
                  Error Handling
                </label>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Generated Code */}
      <Tabs defaultValue="integration" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 bg-black/20 backdrop-blur-sm">
          <TabsTrigger value="integration" className="data-[state=active]:bg-purple-600">
            <Code className="w-4 h-4 mr-2" />
            Integration Code
          </TabsTrigger>
          <TabsTrigger value="sdk" className="data-[state=active]:bg-purple-600">
            <Database className="w-4 h-4 mr-2" />
            SDK Examples
          </TabsTrigger>
          <TabsTrigger value="deployment" className="data-[state=active]:bg-purple-600">
            <Globe className="w-4 h-4 mr-2" />
            Deployment
          </TabsTrigger>
          <TabsTrigger value="testing" className="data-[state=active]:bg-purple-600">
            <Play className="w-4 h-4 mr-2" />
            Testing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="integration">
          <Card className="bg-black/40 border-white/10">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Generated Integration Code
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-purple-400 text-purple-300"
                    onClick={() =>
                      copyToClipboard(
                        codeExamples[selectedLanguage as keyof typeof codeExamples][
                          selectedFramework as keyof typeof codeExamples.javascript
                        ],
                      )
                    }
                  >
                    <Copy className="w-4 h-4 mr-1" />
                    Copy
                  </Button>
                  <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Download className="w-4 h-4 mr-1" />
                    Download
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-black/60 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                  <code>
                    {
                      codeExamples[selectedLanguage as keyof typeof codeExamples][
                        selectedFramework as keyof typeof codeExamples.javascript
                      ]
                    }
                  </code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sdk">
          <Card className="bg-black/40 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Database className="w-5 h-5" />
                SDK Integration Examples
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/60 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                  <code>{sdkExamples[selectedLanguage as keyof typeof sdkExamples] || sdkExamples.javascript}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deployment">
          <Card className="bg-black/40 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Deployment Configuration
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/60 rounded-lg p-4 overflow-x-auto">
                <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                  <code>{deploymentConfigs.vercel}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="testing">
          <Card className="bg-black/40 border-white/10">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Play className="w-5 h-5" />
                Testing Commands
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-black/60 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Test Integration Locally</h4>
                  <pre className="text-sm text-gray-300">
                    <code>npm run test:integration -- --integration-id=integration_123</code>
                  </pre>
                </div>

                <div className="bg-black/60 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Validate Webhook</h4>
                  <pre className="text-sm text-gray-300">
                    <code>curl -X POST http://localhost:3000/api/webhook/validate</code>
                  </pre>
                </div>

                <div className="bg-black/60 rounded-lg p-4">
                  <h4 className="text-white font-medium mb-2">Load Test</h4>
                  <pre className="text-sm text-gray-300">
                    <code>npm run load-test -- --endpoint=/api/integrations/execute</code>
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Code Quality Metrics */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Code Quality Metrics
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-black/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span className="text-sm text-gray-400">Security Score</span>
              </div>
              <div className="text-2xl font-bold text-green-300">A+</div>
            </div>

            <div className="bg-black/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Monitor className="w-4 h-4 text-blue-400" />
                <span className="text-sm text-gray-400">Performance</span>
              </div>
              <div className="text-2xl font-bold text-blue-300">98%</div>
            </div>

            <div className="bg-black/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Code className="w-4 h-4 text-purple-400" />
                <span className="text-sm text-gray-400">Code Coverage</span>
              </div>
              <div className="text-2xl font-bold text-purple-300">94%</div>
            </div>

            <div className="bg-black/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-gray-400">Complexity</span>
              </div>
              <div className="text-2xl font-bold text-yellow-300">Low</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
